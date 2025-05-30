import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function MyOfferPreview({ offer }) {
    const { cld } = useContext(AuthContext);
    const image = cld.image(offer.previewImageUrl);

    return (
        <div className="my_offer_preview">
            <div className="image_wrapper">
                <AdvancedImage cldImg={image} className="offer_preview_image"/>
            </div>
            <h1>{offer.title}</h1>
            <span>{offer.price} грн.</span>
            <span>Активно</span>
        </div>
    );
}

export default MyOfferPreview;