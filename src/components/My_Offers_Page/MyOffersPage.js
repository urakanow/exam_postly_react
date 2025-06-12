import OffersBlock from "../Main_Page/OffersBlock";
import MyOffersBlock from "./MyOffersBlock";

function MyOffersPage() {
    return (
        <div className="vertical_container offers_display_page">
            <h1 className="large_heading">Мої оголошення</h1>

            <MyOffersBlock categoryIndex={1} />
        </div>
    );
}

export default MyOffersPage;