import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function PhotoBlock({ photos }) {
    const { cld } = useContext(AuthContext);
    const offer_test_image = cld.image(photos[0].url)
    const left_arrow_image = cld.image("left_arrow_icon_xozc74")
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p")

    return (
        <div className='green_rectangle vertical_container' id='photo_block'>
            <div className='carouselle horizontal_container'>
                <AdvancedImage cldImg={left_arrow_image} className="carouselle_arrow" id="left_arrow"/>
                <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>

                <div className='image_wrapper' id='offer_photo_wrapper'>
                    <AdvancedImage cldImg={offer_test_image} />
                </div>
            </div>

            <div className='horizontal_container' id='carouselle_indicator_container'>
                <div className='carouselle_indicator' id='carouselle_indicator_selected'/>
                <div className='carouselle_indicator'/>
                <div className='carouselle_indicator'/>
            </div>
        </div>
     );
}

export default PhotoBlock;