import { Box, Button, Grid, Typography } from "@material-ui/core";
import { RefreshRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { ItemCard } from "../components/ItemCard";
import { Item } from "../models/Item";
const data = [
    { title: 'Merina 🥰', description: '', image: 'https://www.nm.org//-/media/northwestern/healthbeat/images/healthy-tips/nm-9-health-issues-women_feature.jpg' },
    { title: 'Cotier 😘', description: '', image: 'https://img.freepik.com/photos-gratuite/plan-horizontal-jolie-femme-peau-foncee-coiffure-afro-large-sourire-dents-blanches-montre-quelque-chose-gentil-ami-pointe-dans-coin-superieur-droit-se-tient-contre-mur_273609-16442.jpg' },
    { title: 'Bandy Merina 😇', description: '', image: 'https://us.123rf.com/450wm/kiuikson/kiuikson1608/kiuikson160800169/62133631-portrait-de-sourire-mod%C3%A8le-masculin.jpg' },
    { title: 'Bandy milay be Cotier 🤫', description: '', image: 'https://img.freepik.com/premium-photo/league-his-own-cropped-shot-calm-muscular-man-isolated-black_590464-31782.jpg' },
];

export const Home = () => {
    const [currentVs, setCurrentVs] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const slicedData = data.slice(currentPage, currentPage + 2);
        // place one item between the two elements
        slicedData.splice(1, 0, {
            title: 'VS',
            description: '',
            image: 'https://image.shutterstock.com/image-photo/versus-sign-260nw-102030828.jpg'
        });
        if (slicedData.length === 3) {
            setCurrentVs(slicedData);
        } else {
            setCurrentVs([]);
        }
    }, [currentPage]);

    const refreshHandler = () => {
        setCurrentVs([]);
            setCurrentPage(0);
    }

    const votingHandler = (item: Item) => {
        setCurrentPage((prev) => prev + 2);
    }

    return <>
        <Grid container spacing={3}>
            {currentVs.length !== 0 && currentVs.map((item, k) => <Grid item xs={k % 2 === 0 ? 5 : 2} key={k}>
                {
                    k % 2 === 0 ? <ItemCard data={item} onVote={votingHandler} /> :
                        <Typography style={{ fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10 }}>VS</Typography>
                }
            </Grid>

            )}
        </Grid >
        {!currentVs.length && <Box style={{ display: 'flex', flexDirection: 'column'}}>
            <Typography style={{ textAlign: 'center', fontSize: 20 }}>No more items</Typography>
            <Button variant={'text'} startIcon={<RefreshRounded/>} onClick={refreshHandler }>Refresh</Button>
        </Box>}
        <Footer />
    </>
}