import { Grid } from "@mui/material";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useState } from "react";
import { Link } from "react-router";

function OfferElement({ offerData = null, linkUrl = null }) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const favorite_unselected_image = cld.image("favorite_icon_unselected_g0i9ol");
    const [image, setImage] = useState(null);
    
    
    useEffect(() =>{
        if (!offerData?.images?.[0]?.url) {
            setImage(null); // Clear image if no valid photo
            return;
        }

        console.log(offerData.images[0].url);
        const img = cld
        .image(offerData.images[0].url)

        const imgElement = new Image();
        imgElement.src = img.toURL();

        imgElement.onload = () => {
            setImage(img);
        };

        imgElement.onerror = () => {
            setImage(null);
        };
    }, [offerData?.images])
    
    return (
        <Grid size={3} className="offer_element">
            {!offerData ? (
                <>
                    <AdvancedImage className="favorite_button" cldImg={favorite_unselected_image} />
                    <img className="offer_preview_image" src="default_image.jpg" />
                    <h1>Осел пихає</h1>
                    <span>420 420 грн.</span>
                </>
            ) : (
                <Link to={`${linkUrl}/${offerData.id}`}>
                    <AdvancedImage className="favorite_button" cldImg={favorite_unselected_image} />
                    <div className="image_wrapper">
                        {image ? (
                            <AdvancedImage cldImg={image} onError={() => setImage(null)}/>
                        ) : (
                            <img className="offer_preview_image" src="default_image.jpg" />
                        )}
                    </div>
                    <h1>{offerData.title}</h1>
                    <span>{offerData.price} грн.</span>
                </Link>
            )}
        </Grid>
     );
}

export default OfferElement;