import CategoryDropdown from "./CategoryDropdown";
import { useContext, useRef, useState } from "react";
import Photo from "./Photo";
import { data, useNavigate } from "react-router";
import useApi from "../Shared/UseApi";
import { AuthContext } from "../Shared/AuthContext";

function CreateOfferPage() {
    const navigate = useNavigate();
    const { authorizedRequest } = useApi();
    const { baseUrl } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const [photos, setPhotos] = useState([])

    const [contacter, setContacter] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    return (
        <div className="create_offer_page_container">
            <div className="create_offer_page_section">
                <h1 className="section_heading">Створити оголошення</h1>

                <label className="text_input_label" htmlFor="title">Назва</label>
                <input type="text" className="form_text_input text_input" id="title" onChange={(e) => setTitle(e.target.value)}/>
                
                <label className="text_input_label" htmlFor="description">Опишіть у подробицях</label>
                <textarea className="form_text_input text_input" id="description" onChange={(e) => setDescription(e.target.value)}/>

                <label className="text_input_label" htmlFor="dropdown">Категорія</label>
                <CategoryDropdown onChange={(index) => setCategory(index)} />

                <label className="text_input_label" htmlFor="price">Ціна</label>
                <input type="text" className="form_text_input text_input" id="price" onChange={(e) => setPrice(e.target.value)}/>
            </div>

            <div className="create_offer_page_section">
                <h1 className="section_heading">Фото</h1>

                <label className="text_input_label" htmlFor="photos_container" id="photos_label">Максимально покажіть всі деталі або дефекти, перше фото буде на обкладинці</label>
                <div className="photos_container" id="photos_container">
                    <div className="photos_container_row">
                        <Photo onFilesSelect={(newPhoto) => setPhotos([
                            ...photos,
                            newPhoto
                        ])}/>
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

                <label className="text_input_label" htmlFor="contacter">Контактна особа</label>
                <input type="text" className="form_text_input text_input" id="contacter" onChange={(e) => setContacter(e.target.value)}/>
                
                <label className="text_input_label" htmlFor="email">Ел. Пошта</label>
                <input type="text" className="form_text_input text_input" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label className="text_input_label" htmlFor="phone_number">Номер телефону</label>
                <input type="text" className="form_text_input text_input" id="phone_number" onChange={(e) => setPhoneNumber(e.target.value)}/>

                <label className="text_input_label" htmlFor="address">Місце знаходження</label>
                <input type="text" className="form_text_input text_input" id="address" onChange={(e) => setAddress(e.target.value)}/>
            </div>

            <button className="green_button" id="add_offer_button" onClick={createOffer}>Додати Оголошення</button>
        </div>
     );

     async function createOffer(){
        try {
            const formData = new FormData();
                
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('contacter', contacter);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);
            
            photos.forEach((photo, index) => {
                formData.append(`Images`, photo); // Key can be just "photos" for multiple files
            });

            console.log(formData);

            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/offer/create-offer`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
    
            if (response.status === 200) {
                console.log("Offer created successfully");
                navigate("/");
            }
        } catch (err) {
            console.error('Failed to create offer:', err);
        }
    }
}

export default CreateOfferPage;