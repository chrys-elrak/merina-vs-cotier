import { Button, Grid, Typography } from "@material-ui/core";
import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../app.env";
import { CreateCard } from "../components/CreateCard";
import { GlobalContext } from "../contexts/global";

export const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState<any>([]);
    const { setMessage } = useContext(GlobalContext);
    const navigation = useNavigate();

    const createVsPost = () => {
        // remove the 2nd element of the array
        data.splice(1, 1);
        // create form data
        const formData = new FormData();
        data.forEach((item: any, i: number) => {
            formData.append(`image${i + 1}`, item.image);
            formData.append('titles', item.title);
            formData.append('descriptions', item.description);
        });
        axios.post(getApiUrl() + "/versus/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(_ => {
            navigation('home');
        })
            .catch((e: AxiosError) => {
                setMessage(() => ({ open: true, text: (e.response?.data as any).message || e.message, severity: "error" }));
            });
    }

    return <Grid container>
        {[0, 1, 2].map((_, i) => <Grid key={i} item xs={i % 2 === 0 ? 5 : 2}>
            {i % 2 === 0 ?
                <Grid item>
                    <CreateCard active={i === activeStep} onChange={(response: { images: string, title: string, description: string }) => {
                        setData((d: any) => {
                            d[i] = response;
                            return d;
                        });
                        setActiveStep(prev => prev + 2);
                    }} />
                </Grid> :
                <Typography style={{ fontSize: 50, textAlign: 'center', height: '100%', lineHeight: 10 }}>VS</Typography>
            }
        </Grid>)}
        <Grid container justifyContent="center">
            <Button disabled={activeStep <= 2} onClick={createVsPost} variant="contained" color="primary">Create</Button>
        </Grid>
    </Grid>
}