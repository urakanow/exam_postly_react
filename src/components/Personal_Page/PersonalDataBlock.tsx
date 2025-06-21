import { ChangeEvent, useContext, useState } from "react";
import { useAuth } from '../Shared/AuthContext';
import useApi from '../Shared/UseApi';

interface Data {
    username: string,
    email: string,
    phoneNumber: string
    firstName?: string,
    lastName?: string,
    city?: string,
    postCode?: string,
    address?: string,
    apartmentNumber?: string,
}

interface PersonalDataBlockProps {
    data: Data
}

function PersonalDataBlock({ data }: PersonalDataBlockProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const [isChanged, setIsChanged] = useState(false);

    const [formData, setFormData] = useState({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        postCode: data.postCode,
        address: data.address,
        apartmentNumber: data.apartmentNumber,
        email: data.email,
        phoneNumber: data.phoneNumber
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!isChanged){
            setIsChanged(true);
        }

        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    return (
        <div id="personal_data" className="green_rectangle vertical_container">
            <h1 className="semi_large_heading">Особистий Кабінет</h1>

            <label className="text_input_label" htmlFor="username">Ім’я Користувача</label>
            <input type="text" className="text_input" id="username" value={formData.username} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="firstName">Ім’я</label>
            <input type="text" className="text_input" id="firstName" value={formData.firstName} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="lastName">Прізвище</label>
            <input type="text" className="text_input" id="lastName" value={formData.lastName} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="city">Місто</label>
            <input type="text" className="text_input" id="city" value={formData.city} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="postCode">Поштовий індекс</label>
            <input type="text" className="text_input" id="postCode" value={formData.postCode} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="address">Адреса</label>
            <input type="text" className="text_input" id="address" value={formData.address} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="apartmentNumber">Номер квартири(якщо присутній)</label>
            <input type="text" className="text_input" id="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="email">Ел. Адреса</label>
            <input type="text" className="text_input" id="email" value={formData.email} onChange={handleChange}/>

            <label className="text_input_label" htmlFor="phoneNumber">Номер телефону</label>
            <input type="text" className="text_input" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>

            {isChanged && <button className="green_button" id="save_button" onClick={editUserData}>Зберегти</button>}
        </div>
     );

     async function editUserData() {
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/edit-personal-data`,
                method: "put",
                data: JSON.stringify(formData)
            })

            if(response.status === 200){
                setIsChanged(false);
                // setUserData(response.data);
                console.log(response.data.message);
            }
        } catch(err) {
            console.error("failed to fetch user: ", err);
        }
     }
}

export default PersonalDataBlock;