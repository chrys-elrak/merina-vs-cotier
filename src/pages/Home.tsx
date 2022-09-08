import { Box, Button, Grid, Typography } from "@material-ui/core";
import { RefreshRounded } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Footer } from "../components/Footer";
import { ItemCard } from "../components/ItemCard";
import { MyTheme } from "../constants/Theme";
import { Item, Versus } from "../models/Versus";
const data = [
    { title: 'Merina 🥰', description: '', image: 'https://www.nm.org//-/media/northwestern/healthbeat/images/healthy-tips/nm-9-health-issues-women_feature.jpg' },
    { title: 'Cotier 😘', description: '', image: 'https://img.freepik.com/photos-gratuite/plan-horizontal-jolie-femme-peau-foncee-coiffure-afro-large-sourire-dents-blanches-montre-quelque-chose-gentil-ami-pointe-dans-coin-superieur-droit-se-tient-contre-mur_273609-16442.jpg' },
    { title: 'Bandy Merina 😇', description: '', image: 'https://us.123rf.com/450wm/kiuikson/kiuikson1608/kiuikson160800169/62133631-portrait-de-sourire-mod%C3%A8le-masculin.jpg' },
    { title: 'Bandy milay be Cotier 🤫', description: '', image: 'https://img.freepik.com/premium-photo/league-his-own-cropped-shot-calm-muscular-man-isolated-black_590464-31782.jpg' },
];

interface HomeProps {
    socket: Socket
}

export const Home = ({ socket }: HomeProps) => {
    const dataRef = useRef<Versus[]>([]);
    const [versus, setVersus] = useState<Item[]>();
    const [currentPageNumber, setCurrentPage] = useState(0);

    useEffect(() => {
        socket.on('FACEBOOK_USER_DATA', (user: any) => {
            console.log(user);
        });
        axios.get(`https://localhost:5000/api/v1/versus`)
            .then(res => {
                dataRef.current = res.data as Versus[];
                _nextVersus();
            }).catch(err => console.log(err));
        return () => { socket.disconnect() };
    }, []);

    const refreshHandler = () => {
        setCurrentPage(0);
    }

    const _nextVersus = () => {
        if (currentPageNumber < dataRef.current.length) {
            setCurrentPage(currentPageNumber + 1);
            const v: Versus = dataRef.current[currentPageNumber];
            setVersus([v.items[0], {} as any, v.items[1]]);
        } else {
            console.log('NOPE', currentPageNumber, dataRef.current.length);
            
        }
    }

    const votingHandler = (item: Item | undefined) => {
        _nextVersus();
    }

    return <>
        <Grid container spacing={3}>
            {versus?.map((item, k) => <Grid item xs={k % 2 === 0 ? 5 : 2} key={k}>
                {
                    k % 2 === 0 ? <ItemCard data={item} onVote={votingHandler} /> :
                        <Typography style={{ fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10 }}>VS</Typography>
                }
            </Grid>
            )}
        </Grid >
        {!versus?.length && <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography style={{ textAlign: 'center', fontSize: 20 }}>No more items</Typography>
            <Button variant={'text'} startIcon={<RefreshRounded />} onClick={refreshHandler}>Refresh</Button>
            <Box style={{ height: MyTheme.value.boxHeight }}></Box>
        </Box>}
        <Footer />
    </>
}