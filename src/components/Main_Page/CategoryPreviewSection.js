import CategoryPreview from "./CategoryPreview";

function CategoriesSection() {
    return (
        <div className="categories_section">
            <CategoryPreview imgUrl="img/furniture_icon.png" categoryName="Меблі" />

            <CategoryPreview imgUrl="img/electronics_icon.png" categoryName="Електроніка" id="electronics" />
            
            <CategoryPreview imgUrl="img/fashion_icon.png" categoryName="Мода" />

            <CategoryPreview imgUrl="img/work_icon.png" categoryName="Робота" />

            <CategoryPreview imgUrl="img/toys_icon.png" categoryName="Іграшки" />

            <CategoryPreview imgUrl="img/car_icon.png" categoryName="Авто" />

            <CategoryPreview imgUrl="img/pets_icon.png" categoryName="Тварини" />

            <CategoryPreview imgUrl="img/real_estate_icon.png" categoryName="Нерухомість" id="real_estate"/>
        </div>
     );
}

export default CategoriesSection;