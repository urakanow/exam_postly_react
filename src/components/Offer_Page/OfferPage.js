import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function OfferPage() {
    const { id } = useParams();
    const { cld } = useContext(AuthContext);
    const profile_picture = cld.image("profile_picture_default_icon_t9kx9b");
    return ( 
        <div className='offer_page_container'>
            
            <div className='offer_page_vertical_section'>
                {id}
            </div>
            <div className='offer_page_vertical_section'>
                <span className='small_text' id='published_at'>Опубліковано Сьогодні о 13:32</span>

                <h1 className='large_heading' id='offer_page_title'>Ігровий Пк</h1>

                <h2 className='medium_heading'>88 000 грн.</h2>

                <div className='user'>
                    {/* <img src='img/profile_picture_default_icon.png' /> */}
                    <AdvancedImage cldImg={profile_picture} />
                    <h2 className='medium_heading'>User</h2>
                </div>
            </div>
        </div>
    );
}

export default OfferPage;