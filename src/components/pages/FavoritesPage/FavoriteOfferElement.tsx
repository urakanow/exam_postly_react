import { Cloudinary} from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import useApi from "../../../hooks/UseApi";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import IOfferElement from "../../Shared/IOfferElement/IOfferElement";
import { OfferPreview } from '../../../models/OfferPreview';

interface FavoriteOfferElementProps {
    offerData: OfferPreview,
    onFavoriteClick: ((id: number) => void)
}

function FavoriteOfferElement({ offerData, onFavoriteClick }: FavoriteOfferElementProps) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const favorite_selected_image = cld.image("favorite_icon_selected_fj3vta");
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi()

    const handleFavoriteClick = async () => {
        deleteFavorite();
        onFavoriteClick(offerData.id);
    };

    return (
        <IOfferElement offerData={offerData} linkUrl={"/offer"}>
            <AdvancedImage className="favorite_button" cldImg={favorite_selected_image} onClick={handleFavoriteClick} />
        </IOfferElement>
    );

    async function deleteFavorite(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/favorite/delete-favorite`,
                data: JSON.stringify(offerData?.id)
            })

            if(response.status === 200){
                console.log("favorite deleted", offerData.id)
            }
        } catch(err) {
            console.error("failed to delete favorite: ", err)
        }
    }
}

export default FavoriteOfferElement;