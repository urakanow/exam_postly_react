import { ChangeEvent, useEffect } from "react";
import { GeneralData } from "./CreateOfferPage";
import { DropdownMenu } from "../../Shared/DropdownMenu/DropdownMenu";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import TextInputField from "./TextInputField";

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

            <TextInputField defaultValue={generalData ? generalData.title : ""} onChange={handleChange} id="title" label="Назва" />
            
            <InputLabel htmlFor="description" text="Опишіть у подробицях" />
            <textarea className="text_input" id="description" defaultValue={generalData ? generalData.description : ""} onChange={handleChange}/>

            <InputLabel htmlFor="category_dropdown" text="Категорія" />
            <DropdownMenu
            items={categories}
            onSelect={(index) => {
                    setGeneralData(prev => ({
                        ...prev,
                        category: index
                    }))}}
            initialText="Виберіть категорію"
            selectedIndex={generalData?.category ? generalData?.category : undefined}
            />

            <InputLabel htmlFor="state_dropdown" text="Стан" />
            <DropdownMenu
            items={states}
            onSelect={(index) => {
                    setGeneralData(prev => ({
                        ...prev,
                        state: index
                    }))}}
            initialText="Виберіть стан"
            selectedIndex={generalData?.state ? generalData?.state : undefined}
            />

            <TextInputField defaultValue={generalData ? generalData.price.toString() : ""} onChange={handleChange} id="price" label="Ціна" />
        </div>
    );
}

export default GeneralDataBlock;