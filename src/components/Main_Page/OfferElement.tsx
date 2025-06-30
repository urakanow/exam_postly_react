import { Grid } from "@mui/material";
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useRef, useState, useContext } from "react";
import { data, Link, useNavigate } from "react-router";
import useApi from "../Shared/UseApi";
import { useAuth } from "../Shared/AuthContext";
import { AxiosError } from "axios";
import { OfferPreview } from "../../models/OfferPreview";


interface OfferElementProps {
    offerData?: OfferPreview | null,
    linkUrl?: string | null,
    onFavoriteClick?: ((id: number) => void) | null
}

function OfferElement({ offerData = null, linkUrl = null, onFavoriteClick = null }: OfferElementProps) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const favorite_unselected_image = cld.image("favorite_icon_unselected_g0i9ol");
    const favorite_selected_image = cld.image("favorite_icon_selected_fj3vta");
    const [image, setImage] = useState<CloudinaryImage | null>(null);
    const [favorite, setFavorite] = useState<boolean>(false);
    const { baseUrl, accessToken } = useAuth();
    const { authorizedRequest } = useApi()
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchFavorite();
    }, [])

    const handleFavoriteClick = async () => {
        if(onFavoriteClick && offerData){
            onFavoriteClick(offerData.id);
        }

        const newFavoriteState = !favorite;
        setFavorite(newFavoriteState);
        
        try {
            if(newFavoriteState) {
            await addFavorite();
            } else {
            await deleteFavorite();
            }
        } catch (error) {
            // Revert if API fails
            setFavorite(!newFavoriteState);
        }
    };

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
            {!offerData ? (
                <>
                    <AdvancedImage className="favorite_button" cldImg={favorite_unselected_image} />
                    <img className="offer_preview_image" src="default_image.jpg" />
                    <h1>Осел пихає</h1>
                    <span>420 420 грн.</span>
                </>
            ) : (
                <div className="offer_element_content_wrapper">
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
                    <AdvancedImage className="favorite_button" cldImg={favorite ? favorite_selected_image : favorite_unselected_image} onClick={handleFavoriteClick} />

                </div>
            )}
        </Grid>
    );

    async function addFavorite(){
        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/favorite/add-favorite`,
                data: JSON.stringify(offerData?.id)
            })

            if(response.status === 200){
                console.log("favorite added")
            }
        } catch(err: unknown) {
            if (typeof err === 'object' && err !== null && 'isAxiosError' in err) {
                const axiosError = err as AxiosError;
                if (axiosError.response?.status === 401) {
                    navigate("/login"); // Note: added leading slash for absolute path
                    return; // Important to return after navigation
                }
            }
            
            console.error("failed to add favorite: ", err);
            setFavorite(false);
        }
    }

    async function deleteFavorite(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/favorite/delete-favorite`,
                data: JSON.stringify(offerData?.id)
            })

            if(response.status === 200){
                console.log("favorite deleted")
            }
        } catch(err) {
            console.error("failed to delete favorite: ", err)
        }
    }

    async function fetchFavorite(){
        if(!offerData){
            return;
        }

        if(!accessToken){
            return;
        }

        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/favorite/is-favorite`,
                data: JSON.stringify(offerData.id)
            })

            if(response.status === 200){
                console.log(`${offerData.id} is ${response.data} favorite`)
                console.log(response.data)
                setFavorite(response.data);
            }
            else if(response.status === 401){
                console.log("unauthorized favorites")
            }
        } catch(err) {
            console.error("failed to fetch favorite: ", err)
        }
    }
}

export default OfferElement;