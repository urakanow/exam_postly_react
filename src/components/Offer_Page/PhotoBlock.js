import { useContext, useState } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function PhotoBlock({ photos }) {
    const { cld } = useContext(AuthContext);
    const [photoIndex, setPhotoIndex] = useState(0);
    const offer_test_image = cld.image(photos[photoIndex].url)
    const left_arrow_image = cld.image("left_arrow_icon_xozc74")
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p")

    function moveLeft(){
        if(photoIndex === 0){
            return;
        }

        setPhotoIndex(photoIndex - 1);
    }

    function moveRight(){
        if(photoIndex === photos.length){
            return;
        }

        setPhotoIndex(photoIndex + 1);
    }

    return (
        <div className='green_rectangle vertical_container' id='photo_block'>
            <div className='carouselle horizontal_container'>
                {photoIndex > 0 &&
                    <button className='arrow_wrapper' onClick={moveLeft}>
                        <AdvancedImage cldImg={left_arrow_image} className="carouselle_arrow" id="left_arrow"/>
                    </button>
                }

                {photoIndex < photos.length - 1 &&
                    <button className='arrow_wrapper' onClick={moveRight}>
                        <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
                    </button>
                }

                <div className='image_wrapper' id='offer_photo_wrapper'>
                    <AdvancedImage cldImg={offer_test_image} />
                </div>
            </div>

            <div className='horizontal_container' id='carouselle_indicator_container'>
                {photos.map((value, index) => 
                    <div key={index} className='carouselle_indicator' id={index === photoIndex ? 'carouselle_indicator_selected' : undefined}/>
                )}
            </div>
        </div>
     );
}

export default PhotoBlock;