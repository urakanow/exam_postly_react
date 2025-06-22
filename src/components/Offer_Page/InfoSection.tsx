import { useAuth } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import DescriptionBlock from "./DescriptionBlock";
import PhotoBlock from "./PhotoBlock";
import { Photo } from '../../models/Photo';

interface Data{
    photos: Photo[],
    category: number,
    description: string,
    id: number,
    address: string
}

interface InfoSectionProps {
    data: Data
}

function InfoSection({ data }: InfoSectionProps) {
    const { cld, options } = useAuth();
    const location_image = cld.image("location_icon_szvvv8")

    return (
        <div className='vertical_container' id='info_section'>
            <PhotoBlock photos={data.photos} />

            <div className='green_rectangle horizontal_container' id='info_bar'>
                <div>Приватна особа</div>
                <div>Стан: Вживане</div>
                <div>{options[data.category]}</div>
            </div>

            <DescriptionBlock data={{
                description: data.description,
                id: data.id
            }}/>

            <div className='green_rectangle horizontal_container' id='location_container'>
                <AdvancedImage cldImg={location_image} id="location_image" />
                <span className='small_text'>Місцезнаходження: {data.address}</span>
            </div>
        </div>
     );
}

export default InfoSection;