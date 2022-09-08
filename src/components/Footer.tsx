import { Container, Grid, Typography } from "@material-ui/core"
import { CSSProperties } from "react"
import { MyTheme } from "../constants/Theme"

type stylesType = {
    container: CSSProperties,
    title: CSSProperties,
}

const styles: stylesType = {
    container: {
        padding: 20,
        minHeight: 200,
        marginTop: 100,
        backgroundColor: MyTheme.colors.primary,
        color: MyTheme.colors.white,
    },
    title: {
        // color: MyTheme.colors.primary,
        // textDecoration: 'underline',
    }
};

export const Footer = () => {
    return <>
        <Grid container style={styles.container}>
            <Grid item style={{ padding: 30 }}>
                <Typography variant="h4" style={styles.title}>Contact</Typography>
                <Typography variant="body1">Email: chrysrakk@gmail.com</Typography>
                <Typography variant="body1">Phone: 034 00 000 00</Typography>
                <Typography variant="body1">Address: 1234, Antananarivo, Madagascar</Typography>
            </Grid>
            <Grid item style={{ padding: 30 }}>
                <Typography variant="h4" style={styles.title}>Social</Typography>
                <Typography variant="body1">Facebook</Typography>
                <Typography variant="body1">Instagram</Typography>
                <Typography variant="body1">Twitter</Typography>
            </Grid>
            <Grid item style={{ padding: 30 }}>
                <Typography variant="h4" style={styles.title}>Legal</Typography>
                <Typography variant="body1">Terms and Conditions</Typography>
                <Typography variant="body1">Privacy Policy</Typography>
            </Grid>
            <Grid item style={{ padding: 30 }}>
                <Typography variant="h4" style={styles.title}>About</Typography>
                <Typography variant="caption">
                    This website is just for fun, don't take it seriously.
                    Here you can participate in a voting system to choose what you like, but it doesn't mean
                    that the best result is universally the best. Anyone can have a different opinion.
                </Typography>
            </Grid>
            <Container>
                <Typography style={{ textAlign: 'center' }}>
                    Copyright &copy; 2022
                </Typography>
            </Container>
        </Grid>
    </>
}