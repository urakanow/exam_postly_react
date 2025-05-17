import '../../App.css';
import Description from './Description';
import FAQSection from './FAQSection';
import SocialMediaSection from './SocialMediaSection';

function Footer() {
    return (
        <footer>
            <Description />

            <SocialMediaSection />

            <FAQSection />

            <div className='download_buttons'>
                <img src='img/google_play_icon.png' />
                <img src='img/app_store_icon.png' />
            </div>
        </footer>
    );
}

export default Footer;