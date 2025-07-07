import BannerSlogan from "./BannerSlogan";
import OffersBlock from "./OffersBlock";

function OffersSection() {
    return (
        <div className="offers_section">
            <OffersBlock categoryIndex={1} />

            <div className="categories_separator" />

            <OffersBlock categoryIndex={2} />

            <BannerSlogan />

            <OffersBlock categoryIndex={4} />

            <div className="categories_separator" />
            
            <OffersBlock categoryIndex={0} />
        </div>
     );
}

export default OffersSection;