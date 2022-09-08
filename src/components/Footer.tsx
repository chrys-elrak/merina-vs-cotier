import { Grid, Typography } from "@material-ui/core"
import { MyTheme } from "../constants/Theme"

export const Footer = () => {
    return <>
    <Grid container spacing={2} style={{ backgroundColor: MyTheme.colors.primary, color: 'white', minHeight: 200, marginTop: 100}}>
        <Grid item>
        <Typography>Test</Typography>
        </Grid>
        <Grid item>
        <Typography>Test 2</Typography>
        </Grid>
    </Grid>
    </>
}