import Description from './Description';
import DownloadButtons from './DownloadButtons';
import FAQSection from './FAQSection';
import SocialMediaSection from './SocialMediaSection';
import './style.css';
import '../../../App.css';

function Footer() {
    return (
        <footer>
            <Description />

            <SocialMediaSection />

            <FAQSection />

            <DownloadButtons />
        </footer>
    );
}

export default Footer;