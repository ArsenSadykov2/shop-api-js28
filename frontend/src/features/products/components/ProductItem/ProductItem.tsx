import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import {apiUrl} from "../../../../../globalConstants.ts";
import NotFoundPic from "../../../../assets/images/NotFoundPic.png";

interface Props {
    id: string,
    categoryTitle: string,
    title: string,
    price: number,
    image: string | undefined,
}

const ProductItem: React.FC<Props> = ({title, price, id, image, categoryTitle}) => {
    let cartImage = NotFoundPic;

    if(image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{xs: 6,sm: 12, md: 6, lg: 4}}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title}/>
                <CardContent>
                    <p>
                        <strong>Category:</strong> {categoryTitle}
                    </p>
                    <strong>
                        Price: {price} Kgs
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;