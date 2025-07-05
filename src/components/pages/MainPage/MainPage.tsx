import CategoryPreviewSection from "./CategoryPreviewSection";
import OffersSection from "./OffersSection";
import Slogan from "./Slogan";
import './style.css';

function MainPage() {
    return (
        <>
            <Slogan />

            <CategoryPreviewSection />

            <OffersSection />            
        </>
     );
}

export default MainPage;