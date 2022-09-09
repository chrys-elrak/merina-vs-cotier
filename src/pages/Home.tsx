import { Box, Button, Grid, Typography } from "@material-ui/core";
import { RefreshRounded } from "@mui/icons-material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { getApiUrl } from "../app.env";
import { Footer } from "../components/Footer";
import { ItemCard } from "../components/ItemCard";
import { MyAlert } from "../components/MyAlert";
import { MyTheme } from "../constants/Theme";
import { GlobalContext } from "../contexts/global";
import { Item, Versus } from "../models/Versus";

interface HomeProps {
    socket: Socket
}

export const Home = ({ socket }: HomeProps) => {
    const dataRef = useRef<Versus[]>([]);
    const [versus, setVersus] = useState<Item[]>();
    const currentPageNumber = useRef(0);
    const { setMessage } = useContext(GlobalContext);

    useEffect(() => {
        socket.on('NEW_VS_DATA', (data: Versus) => {
            setMessage({ open: true, text: `New data received! 🎉`, severity: "success" });
            dataRef.current.push(data);
        });
        _initData();
        return () => { socket.disconnect() };
    }, []);

    const _initData = () => {
        currentPageNumber.current = 0;
        axios.get(getApiUrl() + '/versus')
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
        <Grid container>
            {versus?.map((item, k) => <Grid item xs={k % 2 === 0 ? 5 : 2} key={k}>
                {
                    k % 2 === 0 ? <ItemCard data={item} onVote={() => _nextVersus()} /> :
                        <Typography style={{ fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10 }}>VS</Typography>
                }
            </Grid>
            )}
        </Grid >
        {
            !versus?.length && <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ textAlign: 'center', fontSize: 20 }}>No more items</Typography>
                <Button variant={'text'} startIcon={<RefreshRounded />} onClick={_initData}>Refresh</Button>
                <Box style={{ height: MyTheme.value.boxHeight }}></Box>
            </Box>
        }
        <Footer />
    </>
}