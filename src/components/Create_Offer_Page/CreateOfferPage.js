import CategoryDropdown from "./CategoryDropdown";

function CreateOfferPage() {
    return (
        <div className="create_offer_page_container">
            <div className="create_offer_page_section">
                <h1 className="section_heading">Створити оголошення</h1>

                <label className="form_text_input_label" htmlFor="title">Назва</label>
                <input type="text" className="form_text_input" id="title"/>
                
                <label className="form_text_input_label" htmlFor="description">Опишіть у подробицях</label>
                <input type="text" className="form_text_input" id="description"/>

                <label className="form_text_input_label" htmlFor="dropdown">Категорія</label>
                <CategoryDropdown />
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
        </div>
     );
}

export default CreateOfferPage;