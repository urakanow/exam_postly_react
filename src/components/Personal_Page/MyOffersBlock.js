import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import MyOfferPreview from './MyOfferPreview';

function MyOffersBlock({ offers }) {
    const { cld } = useContext(AuthContext);
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p");

    return (
        <div id="my_offers" className="green_rectangle vertical_container">
            <h1 className="semi_large_heading">Мої оголошення</h1>

            <div className="carouselle horizontal_container">
                <div className="horizontal_container">
                    {offers.map((offer, index) => <MyOfferPreview offer={offer} key={index}/>)}
                </div>

                <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
            </div>
        </div>
     );
}

export default MyOffersBlock;