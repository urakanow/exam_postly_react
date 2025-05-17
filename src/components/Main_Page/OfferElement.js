import { Grid } from "@mui/material";

function OfferElement() {
    return (
        <Grid size={3} className="offer_element">
            <img className="favorite_button" src="img/favorite_icon_unselected.png" />
            <img className="offer_preview_image" src="default_image.jpg" />
            <h1>Осел пихає</h1>
            <span>420 420 грн.</span>
        </Grid>
     );
}

export default OfferElement;