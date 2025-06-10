import { useContext, useState } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import MyOfferPreview from './MyOfferPreview';
import { Link } from 'react-router';

function MyOffersBlock({ offers }) {
    const { cld } = useContext(AuthContext);
    const left_arrow_image = cld.image("left_arrow_icon_xozc74")
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p");
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2);

    function moveRight(){
        if(lastIndex + 1 === offers.length){
            return;
        }

        setFirstIndex(firstIndex + 1);
        setLastIndex(lastIndex + 1);
    }

    function moveLeft(){
        if(firstIndex === 0){
            return;
        }

        setFirstIndex(firstIndex - 1);
        setLastIndex(lastIndex - 1);
    }

    return (
        <div id="my_offers" className="green_rectangle vertical_container">
            <Link to={"/my-offers"}>
                <h1 className="semi_large_heading">Мої оголошення</h1>
            </Link>

            <div className="carouselle horizontal_container">
                {firstIndex > 0 && 
                    <button className='arrow_wrapper' onClick={moveLeft}>
                        <AdvancedImage cldImg={left_arrow_image} className="carouselle_arrow" id="left_arrow"/>
                    </button>
                }

                <div id="my_offers_carouselle" className="horizontal_container">
                    {offers.slice(firstIndex, lastIndex + 1).map((offer, index) => <MyOfferPreview offer={offer} key={index}/>)}
                </div>

                {lastIndex + 1 < offers.length &&
                    <button className='arrow_wrapper' onClick={moveRight}>
                        <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
                    </button>
                }
            </div>
        </div>
     );
}

export default MyOffersBlock;