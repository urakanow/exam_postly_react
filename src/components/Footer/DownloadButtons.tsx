import { AdvancedImage } from '@cloudinary/react';
import { useContext } from 'react';
import { useAuth } from '../Shared/AuthContext';

function DownloadButtons() {
    const { cld } = useAuth();
    const google_play_image = cld.image("google_play_icon_zxnsjp");
    const app_store_image = cld.image("app_store_icon_exsbm3");

    return (
        <div className='download_buttons'>
            <AdvancedImage cldImg={google_play_image} />
            <AdvancedImage cldImg={app_store_image} />
        </div>
     );
}

export default DownloadButtons;