import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import DescriptionBlock from "./DescriptionBlock";
import PhotoBlock from "./PhotoBlock";

function InfoSection() {
    const { cld } = useContext(AuthContext);
    const location_image = cld.image("location_icon_szvvv8")

    return (
        <div className='vertical_container' id='info_section'>
            <PhotoBlock />

            <div className='green_rectangle horizontal_container' id='info_bar'>
                <div>Приватна особа</div>
                <div>Стан: Вживане</div>
                <div>Електроніка</div>
            </div>

            <DescriptionBlock />

            <div className='green_rectangle horizontal_container' id='location_container'>
                <AdvancedImage cldImg={location_image} id="location_image" />
                <span className='small_text'>Місцезнаходження: Дніпро, Дніпропетровська область</span>
            </div>
        </div>
     );
}

export default InfoSection;