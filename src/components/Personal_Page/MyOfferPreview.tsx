import { useContext } from 'react';
import { useAuth } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

interface OfferPreview{
    id: number,
    previewImageUrl: string,
    title: string,
    price: number,
}

interface MyOfferPreviewProps {
    offer: OfferPreview
}

function MyOfferPreview({ offer }: MyOfferPreviewProps) {
    const { cld } = useAuth();
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