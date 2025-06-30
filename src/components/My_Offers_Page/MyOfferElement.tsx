import { Grid } from "@mui/material";
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { useAuth } from "../Shared/AuthContext";
import useApi from "../Shared/UseApi";
import { OfferPreview } from "../../models/OfferPreview";

interface MyOfferElementProps {
    offerData: OfferPreview,
    onDelete: () => void
}

function MyOfferElement({ offerData, onDelete }: MyOfferElementProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const delete_image = cld.image("delete_icon_om93sn");
    const [image, setImage] = useState<CloudinaryImage | null>(null);

    const navigate = useNavigate();

    useEffect(() =>{
        if (!offerData?.previewImageUrl) {
            setImage(null); // Clear image if no valid photo
            return;//!offerData?.images[0].url
        }

        const img = cld.image(offerData.previewImageUrl)

        const imgElement = new Image();
        imgElement.src = img.toURL();

        imgElement.onload = () => {
            setImage(img);
        };

        imgElement.onerror = () => {
            setImage(null);
        };
    }, [offerData.previewImageUrl])
    
    return (
        <Grid size={3} id="my_offer_element" className="offer_element">
            <div className="offer_element_content_wrapper vertical_container">
                <Link to={`/my-offer/${offerData.id}`}>
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
                <div className="horizontal_container">
                    <button className="green_button" onClick={() => navigate(`/my-offer/${offerData.id}`)}>Редагувати</button>
                    <button id="delete_button" className="green_button" onClick={deleteOffer}>
                        <AdvancedImage cldImg={delete_image} />
                    </button>
                </div>
            </div>
        </Grid>
    );

    async function deleteOffer(){
        try{
            // const response = await fetch(`${baseUrl}/offer/delete-offer`, {
            //     method: 'delete',
            //     body: offerData.id
            // })
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/delete-offer`,
                method: 'delete',
                data: JSON.stringify(offerData.id)
            })

            if (response.status === 200) {
                onDelete();
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default MyOfferElement;