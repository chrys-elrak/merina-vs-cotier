import {Box, Button, Grid, Typography} from "@material-ui/core";
import {RefreshRounded} from "@mui/icons-material";
import axios, {AxiosResponse} from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import {Socket} from "socket.io-client";
import {getApiUrl, getFbClientId} from "../app.env";
import {Footer} from "../components/Footer";
import {ItemCard} from "../components/ItemCard";
import {MyTheme} from "../constants/Theme";
import {GlobalContext} from "../contexts/global";
import {Item, Versus} from "../models/Versus";
import {facebookAuthService} from "../services/facebookAuth";



interface HomeProps {
    socket: Socket
}

export const Home = ({socket}: HomeProps) => {
    const dataRef = useRef<Versus[]>([]);
    const [versusItems, setVersusItems] = useState<Item[]>();
    const currentPageNumber = useRef(0);
    const {setMessage, isAuthenticated, user} = useContext(GlobalContext);

    useEffect(() => {
        socket.on('NEW_VS_DATA', (data: Versus) => {
            dataRef.current.push(data);
        });
        _initData();
        return () => {
            socket.disconnect()
        };
    }, []);

    function alreadyVoted(item: Item): boolean {
        const currentVs = dataRef.current[currentPageNumber.current - 1];
        return currentVs.voters.includes(user?._id || '');
    }

    function _initData() {
        currentPageNumber.current = 0;
        axios.get(getApiUrl() + '/versus')
            .then(({data}: AxiosResponse<Versus[]>) => {
                dataRef.current = data;
                _nextVersus();
            }).catch(err => {
            setMessage(() => ({open: true, text: err.message, severity: "error"}));
        });
    }

    function _nextVersus() {
        if (currentPageNumber.current + 1 <= dataRef.current.length) {
            const v: Versus = dataRef.current[currentPageNumber.current];
            if (v) {
                setVersusItems([v.items[0], {} as any, v.items[1]]);
            }
            currentPageNumber.current++;
        } else {
            currentPageNumber.current = 0;
            if (dataRef.current.length > 0) {
                _nextVersus();
            }
        }
    }

    function votingHandler(item: Item) {
        if (!isAuthenticated) {
            setMessage(() => ({open: true, text: "Please login to vote", severity: "info"}));
            facebookAuthService.login();
            return;
        }
        const itemId = item._id;
        const versusId = dataRef.current[currentPageNumber.current - 1]._id;
        axios.post(getApiUrl() + '/versus/vote', {itemId, userId: user.id, versusId})
            .then((res) => {
                    console.log(res);
                    setMessage(() => ({open: true, text: 'Vote success', severity: "success"}));
                    _nextVersus();
                }
            ).catch(err => {
            setMessage(() => ({open: true, text: err.response.data.message ?? err.message, severity: "error"}));
        });
    }

    function shareOnFacebook() {
        const url = `https://localhost:5000/facebook/share`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=share_button`,
            '_isolated', 'width=600,height=400');
    }

    return <>
        <Grid container>
            {versusItems?.map((value, k) => <Grid item xs={k % 2 === 0 ? 5 : 2} key={k}>
                    {
                        k % 2 === 0 ? <ItemCard data={value} onVote={votingHandler} disabled={alreadyVoted(value)}/> :
                            <Typography
                                style={{fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10}}>VS</Typography>
                    }
                </Grid>
            )}
            <Grid item>
                <Button onClick={shareOnFacebook}>Share on facebook</Button>
            </Grid>
        </Grid>
        {
            !versusItems?.length && <Box style={{display: 'flex', flexDirection: 'column'}}>
                <Typography style={{textAlign: 'center', fontSize: 20}}>No more items</Typography>
                <Button variant={'text'} startIcon={<RefreshRounded/>} onClick={_initData}>Refresh</Button>
                <Box style={{height: MyTheme.value.boxHeight}}></Box>
            </Box>
        }
        <Footer/>
    </>
}