import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function PhotoBlock() {
    const { cld } = useContext(AuthContext);
    const offer_test_image = cld.image("e033da6d911d1afa9de7e07933784e7dc5ba243e_govgvc")
    const left_arrow_image = cld.image("left_arrow_icon_xozc74")
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p")

    return (
        <div className='green_rectangle vertical_container' id='photo_block'>
            <div className='carouselle horizontal_container'>
                <AdvancedImage cldImg={left_arrow_image} className="carouselle_arrow" id="left_arrow"/>
                <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
                <AdvancedImage cldImg={offer_test_image} className="carouselle_photo"/>
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