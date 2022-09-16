import { Button, Card, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core';
import React from 'react';
import {MyTheme} from '../constants/Theme';
import {Item} from '../models/Versus';


interface ItemCardProps {
    data?: Item,
    onVote: (item: Item) => void;
    disabled?: boolean;
}

export const ItemCard = ({data, onVote, disabled}: ItemCardProps) => {
    if (!data) {
        return <>No data</>;
    }
    return (
        <>
            <Card style={{
                borderStartStartRadius: 10,
            }}>
                <div style={{
                    display: 'flex',
                    position: 'relative',
                }}>
                    <Typography style={{
                        position: 'absolute',
                        top: 0,
                        fontSize: 20,
                        width: '100%',
                        padding: 5,
                        color: 'white',
                        textAlign: 'center',
                        borderEndEndRadius: 10,
                        borderStartStartRadius: 10,
                        backgroundColor:  MyTheme.colors.primary ,
                    }}>Votes: {data.votes.length}</Typography>
                </div>
                <CardMedia style={{height: MyTheme.value.boxHeight}}
                           image={`https://localhost:5000/static/${data?.image.filename}`}/>
                <CardContent style={{textAlign: 'center'}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" variant='outlined' disabled={disabled} style={{width: '100%'}} onClick={() => onVote(data)}>
                        I like this
                    </Button>
                </CardActions>
            </Card>

        </>
    )
}


