import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { MyTheme } from '../constants/Theme';
import { Item } from '../models/Versus';


interface ItemCardProps {
    data?: Item,
    onVote: (item: Item | undefined) => void;
}

export const ItemCard = ({ data, onVote }: ItemCardProps) => {
    return (
        <>
            <Card>
                <CardMedia style={{ height: MyTheme.value.boxHeight }} image={`https://localhost:5000/static/${data?.image.filename}`} />
                <CardContent style={{textAlign: 'center'}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data?.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" variant='outlined' style={{ width: '100%'}} onClick={() => onVote(data)}>
                        I like this
                    </Button>
                </CardActions>
            </Card>

        </>
    )
}
