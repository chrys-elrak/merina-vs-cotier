import { Box, Button, Grid, Snackbar, Typography } from "@material-ui/core";
import { RefreshRounded } from "@mui/icons-material";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Footer } from "../components/Footer";
import { ItemCard } from "../components/ItemCard";
import { MyTheme } from "../constants/Theme";
import { FacebookDataResponse } from "../models/User";
import { Item, Versus } from "../models/Versus";

const initialMessage = { open: false, text: "", severity: "success" };
interface HomeProps {
    socket: Socket
}

export const Home = ({ socket }: HomeProps) => {
    const dataRef = useRef<Versus[]>([]);
    const [message, setMessage] = useState(initialMessage);
    const [versus, setVersus] = useState<Item[]>();
    const currentPageNumber = useRef(0);

    useEffect(() => {
        socket.on('FACEBOOK_USER_DATA', (fb: FacebookDataResponse) => {
            setMessage(() => ({ open: true, text: `Welcome ${fb.data.user.name}`, severity: "success" }));
        });
        socket.on('NEW_VS_DATA', (data: Versus) => {
            dataRef.current.push(data);
            setMessage(() => ({ open: true, text: `New data received! 🎉`, severity: "success" }));
        });
        _initData();
        return () => { socket.disconnect() };
    }, []);

    const _initData = () => {
        currentPageNumber.current = 0;
        axios.get(`https://localhost:5000/api/v1/versus`)
            .then(({ data }: AxiosResponse<Versus[]>) => {
                dataRef.current = data;
                _nextVersus();
            }).catch(err => {
                setMessage(() => ({ open: true, text: err.message, severity: "error" }));
            });
    }

    const _nextVersus = () => {
        if (currentPageNumber.current + 1 <= dataRef.current.length) {
            const v: Versus = dataRef.current[currentPageNumber.current];
            if (v) {
                setVersus([v.items[0], {} as any, v.items[1]]);
            }
            currentPageNumber.current++;
        }
        else {
            currentPageNumber.current = 0;
            if (dataRef.current.length > 0) {
                _nextVersus();
            }
        }
    }

    return <>
        <Snackbar open={message.open} autoHideDuration={6000} onClose={() => setMessage(initialMessage)}>
            <Alert severity={message.severity as AlertColor} sx={{ width: '100%' }}>
                {message.text}
            </Alert>
        </Snackbar>
        <Grid container>
            {versus?.map((item, k) => <Grid item xs={k % 2 === 0 ? 5 : 2} key={k}>
                {
                    k % 2 === 0 ? <ItemCard data={item} onVote={() => _nextVersus()} /> :
                        <Typography style={{ fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10 }}>VS</Typography>
                }
            </Grid>
            )}
        </Grid >
        {!versus?.length && <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography style={{ textAlign: 'center', fontSize: 20 }}>No more items</Typography>
            <Button variant={'text'} startIcon={<RefreshRounded />} onClick={_initData}>Refresh</Button>
            <Box style={{ height: MyTheme.value.boxHeight }}></Box>
        </Box>}
        <Footer />
    </>
}