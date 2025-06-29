import { ChangeEvent, useEffect } from "react";
import { GeneralData } from "./CreateOfferPage";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../Shared/AuthContext";

interface GeneralDataBlockProps {
    setGeneralData: React.Dispatch<React.SetStateAction<GeneralData>>,
    generalData?: GeneralData
}

function GeneralDataBlock({ setGeneralData, generalData }: GeneralDataBlockProps) {
    const { categories } = useAuth();
    const states = ["Нове", "Вживане", "З дефектом"];
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setGeneralData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    useEffect(() =>{
        console.log("general data: ", generalData);
    }, [generalData])

    return (
        <div className="create_offer_page_section">
            <h1 className="section_heading">Створити оголошення</h1>

            <label className="text_input_label" htmlFor="title">Назва</label>
            <input type="text" className="form_text_input text_input" id="title" defaultValue={generalData ? generalData.title : ""} onChange={handleChange}/>
            
            <label className="text_input_label" htmlFor="description">Опишіть у подробицях</label>
            <textarea className="form_text_input text_input" id="description" defaultValue={generalData ? generalData.description : ""} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="category_dropdown">Категорія</label>
            <DropdownMenu
            items={categories}
            onSelect={(index) => {
                    setGeneralData(prev => ({
                        ...prev,
                        category: index
                    }))}}
            initialText="Виберіть категорію"
            />

            <label className="text_input_label" htmlFor="state_dropdown">Стан</label>
            <DropdownMenu
            items={states}
            onSelect={(index) => {
                    setGeneralData(prev => ({
                        ...prev,
                        state: index
                    }))}}
            initialText="Виберіть стан"
            />

            <label className="text_input_label" htmlFor="price">Ціна</label>
            <input type="text" className="form_text_input text_input" id="price" defaultValue={generalData ? generalData.price : ""} onChange={handleChange}/>
        </div>
    );
}

export default GeneralDataBlock;