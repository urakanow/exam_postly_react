import Logo from "../Header/Logo";

function SocialMediaSection() {
    return (
        <div className='social_media'>
            <div className='social_media_text'>
                {/* <span className='logo' id='footer_logo'>
                    <span id='gradient_part'>ШУКАЙ</span>
                    <span id='green_part'>КА</span>
                </span> */}
                <Logo id="footer_logo" />
                <span> В СОЦ МЕРЕЖАХ</span>
            </div>

            <div className='social_media_images'>
                <img src='img/tiktok_icon.png' id='tiktok_logo'/>
                <img src='img/youtube_icon.png' id='youtube_logo'/>
                <img src='img/instagram_icon.png' id='instagram_logo'/>
            </div>
        </div>
     );
}

export default SocialMediaSection;