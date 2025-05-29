function PersonalDataBlock() {
    return (
        <div id="personal_data" className="green_rectangle vertical_container">
            <h1 className="semi_large_heading">Особистий Кабінет</h1>

            <label className="text_input_label" htmlFor="name">Ім’я</label>
            <input type="text" className="text_input" id="name" value={"Олег"}/>

            <label className="text_input_label" htmlFor="name">Прізвище</label>
            <input type="text" className="text_input" id="name" value={"Буловинов"}/>

            <label className="text_input_label" htmlFor="name">Місто</label>
            <input type="text" className="text_input" id="name" value={"Київ"}/>

            <label className="text_input_label" htmlFor="name">Поштовий індекс</label>
            <input type="text" className="text_input" id="name" value={"02000"}/>

            <label className="text_input_label" htmlFor="name">Адреса</label>
            <input type="text" className="text_input" id="name" value={"7-5, Несторівський провулок"}/>

            <label className="text_input_label" htmlFor="name">Номер квартири</label>
            <input type="text" className="text_input" id="name" value={"14"}/>

            <label className="text_input_label" htmlFor="name">Ел. Адреса</label>
            <input type="text" className="text_input" id="name" value={"3366bulka@gmail.com"}/>

            <label className="text_input_label" htmlFor="name">Номер телефону</label>
            <input type="text" className="text_input" id="name" value={"+3800668735489"}/>

            <button className="green_button" id="save_button">Зберегти</button>
        </div>
     );
}

export default PersonalDataBlock;