import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Item } from '../models/Item';


interface ItemCardProps {
    data: Item,
    onVote: (item: Item) => void;
}

export const ItemCard = ({ data, onVote }: ItemCardProps) => {
    return (
        <>
            <Card>
                <CardMedia style={{ height: 500 }} image={data.image} />
                {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.description}
                    </Typography>
                </CardContent>
                */}
                <CardActions>
                    <Button size="large" style={{ width: '100%'}} color="primary" onClick={() => onVote(data)}>
                        I like this
                    </Button>
                </CardActions>
            </Card>

        </>
    )
}
