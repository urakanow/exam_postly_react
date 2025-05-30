import CategoryDropdown from "./CategoryDropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router";
import useApi from "../Shared/UseApi";
import { AuthContext } from "../Shared/AuthContext";
import ContactDataBlock from "./ContactDataBlock";
import PhotosBlock from "./PhotosBlock";

function CreateOfferPage() {
    const navigate = useNavigate();
    const { authorizedRequest } = useApi();
    const { baseUrl } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const [photos, setPhotos] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null
    })

    const [contactData, setContactData] = useState({
        contacter: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

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

            <PhotosBlock photos={photos} setPhotos={setPhotos}/>

            <ContactDataBlock formData={contactData} setFormData={setContactData} />

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
            
            Object.entries(contactData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(photos).forEach(([key, value]) => {
                if(value == null){
                    return;
                }
                
                // Extract the real MIME type from the Data URL
                const matches = value.match(/^data:(.+?);base64/);
                const mimeType = matches?.[1] || 'image/png'; // Fallback to PNG if unknown
                
                // Map MIME type to correct extension
                const extension = mimeType.split('/')[1] || 'png';
                
                // Create file with proper extension
                const file = dataURLtoFile(value, `image_${key}.${extension}`);
                formData.append("Images", file);
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

    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/png';
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);
        
        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        
        return new File([u8arr], filename, { type: mime });
    }
}

export default CreateOfferPage;