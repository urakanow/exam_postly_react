import { ChangeEvent, useContext, useEffect, useState } from "react";
import useApi from "../Shared/UseApi";
import { useAuth } from "../Shared/AuthContext";

interface FormData {
    contacter: string,
    email: string,
    phoneNumber: string,
    address: string,   
}

interface ContactDataBlockProps {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

function ContactDataBlock({formData, setFormData}: ContactDataBlockProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();

    // const [formData, setFormData] = useState({
    //     contacter: "",
    //     email: "",
    //     phoneNumber: "",
    //     address: "",
    // });
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    useEffect(() => {
        fetchPersonalData();
    }, []);
    
    function isFilled(){
        return Object.values(formData).some(value => value.trim() === "");
    }

    function showError(text: string){
        console.error(text);
    }

    return (
        <div className="create_offer_page_section">
            <h1 className="section_heading">Контактні дані</h1>

            <label className="text_input_label" htmlFor="contacter">Контактна особа</label>
            <input required type="text" className="form_text_input text_input" id="contacter" value={formData.contacter} onChange={handleChange}/>
            
            <label className="text_input_label" htmlFor="email">Ел. Пошта</label>
            <input type="text" className="form_text_input text_input" id="email" value={formData.email} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="phoneNumber">Номер телефону</label>
            <input type="text" className="form_text_input text_input" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="address">Місце знаходження</label>
            <input type="text" className="form_text_input text_input" id="address" value={formData.address} onChange={handleChange}/>
        </div>
    );

    async function fetchPersonalData(){
        if(!isFilled()){
            showError("all fields must be filled")
            return;
        }

        try {
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/user/get-personal-data`,
            });
    
            if (response.status === 200) {
                var data = response.data;

                if(!formData.contacter){
                    setFormData(prev => ({
                        ...prev,
                        ["contacter"]: `${data.firstName} ${data.lastName}`
                    }));
                }

                if(!formData.email){
                    setFormData(prev => ({
                        ...prev,
                        ["email"]: data.email
                    }));
                }

                if(!formData.phoneNumber){
                    setFormData(prev => ({
                        ...prev,
                        ["phoneNumber"]: data.phoneNumber
                    }));
                }

                if(!formData.address){
                    if(data.address && data.apartmentNumber && data.city && data.postCode){
                        setFormData(prev => ({
                            ...prev,
                            ["address"]: `${data.address}${data.apartmentNumber && ` кв. ${data.apartmentNumber}`}, м. ${data.city} ${data.postCode}`
                        }));//вул. Тараса Шевченка 14 кв. 2, м. Дніпро 42069
                    }
                }
            }
        } catch (err) {
            console.error('Failed to fetch personal data:', err);
        }
    }


}

export default ContactDataBlock;