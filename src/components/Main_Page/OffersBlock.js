import { Grid, Grow } from "@mui/material";
import OfferElement from "./OfferElement";

function OffersBlock({ categoryName }) {
    return (
        <div className="offers_block">
            <h1 className="category_name">{categoryName}</h1>

            <Grid container spacing={2} className="offers_grid">
                <OfferElement />
                <OfferElement />
                <OfferElement />
                <OfferElement />
            </Grid>

            <button className="see_more">Див. більше</button>
        </div>
     );
}

export default OffersBlock;