import { useContext, useEffect, useState } from "react";
import useApi from "../Shared/UseApi";
import { AuthContext } from "../Shared/AuthContext";

function ContactDataBlock({ formData, setFormData }) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useContext(AuthContext);

    // const [formData, setFormData] = useState({
    //     contacter: "",
    //     email: "",
    //     phoneNumber: "",
    //     address: "",
    // });
    
    const handleChange = (e) => {
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

    function showError(text){
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

                setFormData(prev => ({
                    ...prev,
                    ["contacter"]: `${data.firstName} ${data.lastName}`
                }));
                setFormData(prev => ({
                    ...prev,
                    ["email"]: data.email
                }));
                setFormData(prev => ({
                    ...prev,
                    ["phoneNumber"]: data.phoneNumber
                }));
                setFormData(prev => ({
                    ...prev,
                    ["address"]: `${data.address}${data.apartmentNumber && ` кв. ${data.apartmentNumber}`}, м. ${data.city} ${data.postCode}`
                }));//вул. Тараса Шевченка 14 кв. 2, м. Дніпро 42069
            }
        } catch (err) {
            console.error('Failed to fetch personal data:', err);
        }
    }


}

export default ContactDataBlock;