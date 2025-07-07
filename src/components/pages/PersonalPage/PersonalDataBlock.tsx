import { ChangeEvent, useState } from "react";
import useApi from "../../../hooks/UseApi";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import RegularButton from "../../Shared/RegularButton/RegularButton";
import TextInputField from "../CreateOfferPage/TextInputField";

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

            <TextInputField value={formData.username} onChange={handleChange} id="username" label="Ім’я Користувача" />

            <TextInputField value={formData.firstName} onChange={handleChange} id="firstName" label="Ім’я" />

            <TextInputField value={formData.lastName} onChange={handleChange} id="lastName" label="Прізвище" />

            <TextInputField value={formData.city} onChange={handleChange} id="city" label="Місто" />

            <TextInputField value={formData.postCode} onChange={handleChange} id="postCode" label="Поштовий індекс" />

            <TextInputField value={formData.address} onChange={handleChange} id="address" label="Адреса" />

            <TextInputField value={formData.apartmentNumber} onChange={handleChange} id="apartmentNumber" label="Номер квартири(якщо присутній)" />

            <TextInputField value={formData.email} onChange={handleChange} id="email" label="Ел. Адреса" />

            <TextInputField value={formData.phoneNumber} onChange={handleChange} id="phoneNumber" label="Номер телефону" />

            {isChanged && <RegularButton id="save_button" onClick={editUserData} text="Зберегти" />}
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