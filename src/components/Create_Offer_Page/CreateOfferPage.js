import CategoryDropdown from "./CategoryDropdown";
import { useRef, useState } from "react";
import Photo from "./Photo";

function CreateOfferPage() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger hidden input
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // console.log(files) // Pass files to parent
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <div className="create_offer_page_container">
            <div className="create_offer_page_section">
                <h1 className="section_heading">Створити оголошення</h1>

                <label className="form_text_input_label" htmlFor="title">Назва</label>
                <input type="text" className="form_text_input" id="title"/>
                
                <label className="form_text_input_label" htmlFor="description">Опишіть у подробицях</label>
                {/* <input type="text" className="form_text_input" id="description"/> */}
                <textarea  className="form_text_input" id="description"/>

                <label className="form_text_input_label" htmlFor="dropdown">Категорія</label>
                <CategoryDropdown />
            </div>

            <div className="create_offer_page_section">
                <h1 className="section_heading">Фото</h1>


                <label className="form_text_input_label" htmlFor="photos_container" id="photos_label">Максимально покажіть всі деталі або дефекти, перше фото буде на обкладинці</label>
                <div className="photos_container" id="photos_container">
                    <div className="photos_container_row">
                        <Photo />
                        <Photo />
                        <Photo />
                        <Photo />
                    </div>

                    <div className="photos_container_row">
                        <Photo />
                        <Photo />
                        <Photo />
                        <Photo />
                    </div>
                </div>
            </div>

            <div className="create_offer_page_section">
                <h1 className="section_heading">Контактні дані</h1>

                <label className="form_text_input_label" htmlFor="contacter">Контактна особа</label>
                <input type="text" className="form_text_input" id="contacter"/>
                
                <label className="form_text_input_label" htmlFor="email">Ел. Пошта</label>
                <input type="text" className="form_text_input" id="email"/>

                <label className="form_text_input_label" htmlFor="phone_number">Номер телефону</label>
                <input type="text" className="form_text_input" id="phone_number"/>

                <label className="form_text_input_label" htmlFor="location">Місце знаходження</label>
                <input type="text" className="form_text_input" id="location"/>

            </div>

            <button className="green_button">Додати Оголошення</button>
        </div>
     );
}

export default CreateOfferPage;