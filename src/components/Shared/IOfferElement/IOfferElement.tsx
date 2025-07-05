import { Grid } from "@mui/material";
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { ReactNode, useEffect, useState } from "react";
import { Link} from "react-router";
import { OfferPreview } from "../../../models/OfferPreview";
import './style.css';

interface IOfferElementProps {
    offerData: OfferPreview,
    linkUrl: string,
    children?: ReactNode
}

function IOfferElement({ offerData, linkUrl, children }: IOfferElementProps) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    
    const [image, setImage] = useState<CloudinaryImage | null>(null);
    
    useEffect(() =>{
        if (!offerData?.previewImageUrl) {
            setImage(null); // Clear image if no valid photo
            return;
        }

        // console.log(offerData.images[0].url);
        const img = cld.image(offerData.previewImageUrl)

        const imgElement = new Image();
        imgElement.src = img.toURL();

        imgElement.onload = () => {
            setImage(img);
        };

        imgElement.onerror = () => {
            setImage(null);
        };
    }, [offerData?.previewImageUrl])
    
    return (
        <Grid size={3} className="offer_element">
            {offerData && (
                <div className="vertical_container offer_element_content_wrapper">
                    <Link to={`${linkUrl}/${offerData.id}`}>
                        <div className="image_wrapper">
                            {image ? (
                                <AdvancedImage className="offer_preview_image" cldImg={image} onError={() => setImage(null)}/>
                            ) : (
                                <img className="offer_preview_image" src="default_image.jpg" />
                            )}
                        </div>
                        <h1>{offerData.title}</h1>
                        <span>{offerData.price} грн.</span>
                    </Link>
                    {children !== undefined && children}
                </div>
            )}
        </Grid>
    );
}

export default IOfferElement;