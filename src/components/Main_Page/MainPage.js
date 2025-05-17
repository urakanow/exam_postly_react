import BannerSlogan from "./BannerSlogan";
import CategoriesSection from "./CategoryPreviewSection";
import OffersBlock from "./OffersBlock";
import Slogan from "./Slogan";

function MainPage() {
    return (
        <>
            <Slogan />

            <CategoriesSection />

            <div className="offers_section">
                <OffersBlock categoryName="Електроніка" />

                <div className="categories_separator" />

                <OffersBlock categoryName="Мода" />

                <BannerSlogan />

                <OffersBlock categoryName="Іграшки" />

                <div className="categories_separator" />
                
                <OffersBlock categoryName="Меблі" />
            </div>
        </>
     );
}

export default MainPage;