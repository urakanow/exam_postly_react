import { Grid } from "@mui/material";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

function DefaultOfferElement() {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const favorite_unselected_image = cld.image("favorite_icon_unselected_g0i9ol");
    
    return (
        <Grid size={3} className="offer_element">
            <AdvancedImage className="favorite_button" cldImg={favorite_unselected_image} />
            <img className="offer_preview_image" src="default_image.jpg" />
            <h1>Осел пихає</h1>
            <span>420 420 грн.</span>
        </Grid>
    );
}

export default DefaultOfferElement;