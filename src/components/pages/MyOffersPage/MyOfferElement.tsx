import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate } from "react-router";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import useApi from "../../../hooks/UseApi";
import { OfferPreview } from "../../../models/OfferPreview";
import './style.css';
import IOfferElement from "../../Shared/IOfferElement/IOfferElement";
import RegularButton from '../../Shared/RegularButton/RegularButton';

interface MyOfferElementProps {
    offerData: OfferPreview,
    onDelete: () => void
}

function MyOfferElement({ offerData, onDelete }: MyOfferElementProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const delete_image = cld.image("delete_icon_om93sn");

    const navigate = useNavigate();
    
    return (
        <IOfferElement offerData={offerData} linkUrl="/my-offer">
            <div id='my_offer_element_button_section' className="horizontal_container">
                <RegularButton onClick={() => navigate(`/my-offer/${offerData.id}`)} text='Редагувати' />
                <button id="delete_button" onClick={deleteOffer}>
                    <AdvancedImage cldImg={delete_image} />
                </button>
            </div>
        </IOfferElement>
    );

    async function deleteOffer(){
        try{
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