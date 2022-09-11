import { Button, Card, CardActions, CardContent, CardMedia, Grid, TextField } from "@material-ui/core"
import { MyTheme } from "../constants/Theme"
import placeholder from '../assets/placeholder.png'
import { useRef, useState } from "react";

export const Create = () => {
    const inputRef = useRef<HTMLInputElement>();
    const [image, setImage] = useState<ArrayBuffer>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as any);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return <Grid container spacing={5}>
        <Grid item xl={6}>
            <Card style={{ width: 500 }}>
                <CardMedia
                    style={{ height: MyTheme.value.boxHeight, cursor: 'pointer' }}
                    onClick={() => inputRef?.current?.click()}
                    image={(image || placeholder) as any}
                />
                <CardContent>
                    <TextField fullWidth label="Title" />
                    <br />
                    <br />
                    <TextField fullWidth multiline label="Description" />
                    <input ref={inputRef as any}
                        type="file" style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </CardContent>
                <CardActions>
                    <Button>Create</Button>
                    <Button onClick={() => setImage(null)}>Clear image</Button>
                </CardActions>
            </Card>
        </Grid>
        {/* <Grid item xl={6}>
            <Card style={{ width: 500 }}>
                {<CardMedia style={{ height: MyTheme.value.boxHeight }} src="/assets/placeholder.png" />}
                <CardContent>
                    <TextField fullWidth label="Title" />
                    <br />
                    <br />
                    <TextField fullWidth multiline label="Description" />
                    <input type="file" style={{ display: 'none' }} />
                </CardContent>
                <CardActions>
                    <Button>Create</Button>
                </CardActions>
            </Card>
        </Grid> */}
    </Grid>
}