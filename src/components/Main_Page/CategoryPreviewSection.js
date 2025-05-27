import CategoryPreview from "./CategoryPreview";

function CategoryPreviewSection() {
    return (
        <div className="categories_section">
            <CategoryPreview imgUrl="furniture_icon_kgmrrx" categoryName="Меблі" />

            <CategoryPreview imgUrl="electronics_icon_sgujlx" categoryName="Електроніка" id="electronics" />
            
            <CategoryPreview imgUrl="fashion_icon_ixxhbh" categoryName="Мода" />

            <CategoryPreview imgUrl="work_icon_apknda" categoryName="Робота" />

            <CategoryPreview imgUrl="toys_icon_d203tx" categoryName="Іграшки" />

            <CategoryPreview imgUrl="car_icon_qyc5mi" categoryName="Авто" />

            <CategoryPreview imgUrl="pets_icon_xjqsnq" categoryName="Тварини" />

            <CategoryPreview imgUrl="real_estate_icon_gvhzkj" categoryName="Нерухомість" id="real_estate"/>
        </div>
     );
}

export default CategoryPreviewSection;