import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../hooks/UseApi";
import { useAuth } from "../AuthContext/AuthContext";
import { AxiosError } from "axios";
import { OfferPreview } from "../../../models/OfferPreview";
import IOfferElement from "../IOfferElement/IOfferElement";

interface OfferElementProps {
    offerData: OfferPreview,
    onFavoriteClick?: ((id: number) => void) | null
}

function OfferElement({ offerData, onFavoriteClick = null }: OfferElementProps) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const favorite_unselected_image = cld.image("favorite_icon_unselected_g0i9ol");
    const favorite_selected_image = cld.image("favorite_icon_selected_fj3vta");
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
            setFavorite(!newFavoriteState);
        }
    };

    return (
        <IOfferElement offerData={offerData} linkUrl={"/offer"}>
            <AdvancedImage className="favorite_button" cldImg={favorite ? favorite_selected_image : favorite_unselected_image} onClick={handleFavoriteClick} />
        </IOfferElement>
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
                    navigate("/login");
                    return;
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