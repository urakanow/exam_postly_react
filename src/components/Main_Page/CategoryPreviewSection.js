import { Link } from "react-router";
import CategoryPreview from "./CategoryPreview";

function CategoryPreviewSection() {
    return (
        <div className="categories_section">
            <Link to={`/category/${0}`}>
                <CategoryPreview imgUrl="furniture_icon_kgmrrx" categoryName="Меблі" />
            </Link>
            
            <Link to={`/category/${1}`}>
                <CategoryPreview imgUrl="electronics_icon_sgujlx" categoryName="Електроніка" id="electronics" />
            </Link>
            
            <Link to={`/category/${2}`}>
                <CategoryPreview imgUrl="fashion_icon_ixxhbh" categoryName="Мода" />
            </Link>

            <Link to={`/category/${3}`}>
                <CategoryPreview imgUrl="work_icon_apknda" categoryName="Робота" />
            </Link>
            
            <Link to={`/category/${4}`}>
                <CategoryPreview imgUrl="toys_icon_d203tx" categoryName="Іграшки" />
            </Link>

            <Link to={`/category/${5}`}>
                <CategoryPreview imgUrl="car_icon_qyc5mi" categoryName="Авто" />
            </Link>

            <Link to={`/category/${6}`}>
                <CategoryPreview imgUrl="pets_icon_xjqsnq" categoryName="Тварини" />
            </Link>

            <Link to={`/category/${7}`}>
                <CategoryPreview imgUrl="real_estate_icon_gvhzkj" categoryName="Нерухомість" id="real_estate"/>
            </Link>
        </div>
     );
}

export default CategoryPreviewSection;