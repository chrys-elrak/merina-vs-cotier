import { Card, Box, IconButton, CardMedia, CardContent, TextField, CardActionArea, CardActions, Button } from "@material-ui/core";
import { CloseOutlined } from "@mui/icons-material";
import { MyTheme } from "../constants/Theme";
import placeholder from '../assets/placeholder.png';
import { useRef, useState } from "react";

export function CreateCard({ onChange, active }: { onChange: (data: any) => void, active?: boolean }) {

    const ref = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImageSrc(e.target.result);
                }
            };
        }
    };

    return <Card style={{ width: 500 }}>
        <Box>
            {Boolean(image) && <Box style={{ position: 'absolute' }}>
                <IconButton onClick={() => setImage(null)} color="secondary">
                    <CloseOutlined />
                </IconButton>
            </Box>}
            <CardMedia
                style={{ height: MyTheme.value.boxHeight, cursor: active ? 'pointer' : 'not-allowed', opacity: active ? 1 : 0.5 }}
                onClick={() => {
                    if (active) {
                        ref?.current?.click();
                    }
                }}
                image={(imageSrc || placeholder) as any} />
        </Box>
        <CardContent>
            <TextField disabled={!active} fullWidth onChange={(e) => setTitle(e.target.value)} label="Title" />
            <br />
            <br />
            <TextField disabled={!active} fullWidth multiline onChange={(e) => setDescription(e.target.value)} label="Description" />
            <input ref={ref}
                accept="image/*"
                type="file" style={{ display: 'none' }}
                onChange={handleImageChange} />
        </CardContent>
        <CardActions>
            <Button
                disabled={!active || !image}
                onClick={() => {
                    if (!image) {
                        alert('Please select an image');
                        return;
                    }
                    onChange({ image, title, description });
                }}>Done</Button>
        </CardActions>
    </Card >;
}