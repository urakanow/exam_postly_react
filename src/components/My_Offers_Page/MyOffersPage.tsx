import OffersBlock from "../Main_Page/OffersBlock";
import MyOffersBlock from "./MyOffersBlock";

function MyOffersPage() {
    return (
        <div className="vertical_container offers_display_page">
            <h1 className="large_heading">Мої оголошення</h1>

            <MyOffersBlock />
        </div>
    );
}

export default MyOffersPage;