import Logo from "../Header/Logo";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";

function SocialMediaSection() {
    const { cld } = useContext(AuthContext);
    const tiktok_image = cld.image("tiktok_icon_gipkai");
    const youtube_image = cld.image("youtube_icon_iiogjg");
    const instagram_image = cld.image("instagram_icon_kq6ssd");

    return (
        <div className='social_media'>
            <div className='social_media_text'>
                <Logo id="footer_logo" />
                <span> В СОЦ МЕРЕЖАХ</span>
            </div>

            <div className='social_media_images'>
                <AdvancedImage cldImg={tiktok_image} id='tiktok_logo'/>
                <AdvancedImage cldImg={youtube_image} id='youtube_logo' />
                <AdvancedImage cldImg={instagram_image} id='instagram_logo' />
            </div>
        </div>
     );
}

export default SocialMediaSection;