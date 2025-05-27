import BannerSlogan from "./BannerSlogan";
import CategoryPreviewSection from "./CategoryPreviewSection";
import OffersBlock from "./OffersBlock";
import Slogan from "./Slogan";

function MainPage() {
    return (
        <>
            <Slogan />

            <CategoryPreviewSection />

            <div className="offers_section">
                <OffersBlock categoryIndex={1} />

                <div className="categories_separator" />

                <OffersBlock categoryIndex={2} />

                <BannerSlogan />

                <OffersBlock categoryIndex={4} />

                <div className="categories_separator" />
                
                <OffersBlock categoryIndex={0} />
            </div>
        </>
     );
}

export default MainPage;