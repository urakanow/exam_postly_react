import { useContext, useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router";
import useApi from "../Shared/UseApi";
import { AuthContext } from "../Shared/AuthContext";
import ContactDataBlock from "./ContactDataBlock";
import PhotosBlock from "./PhotosBlock";
import GeneralDataBlock from "./GeneralDataBlock";

function CreateOfferPage() {
    const navigate = useNavigate();
    const { authorizedRequest } = useApi();
    const { baseUrl } = useContext(AuthContext);
    const [error, setError] = useState("");

    const[generalData, setGeneralData] = useState({
        title: "",
        description: "",
        category: "",
        price: ""
    });

    const [photos, setPhotos] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null
    });

    const [contactData, setContactData] = useState({
        contacter: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        console.log(generalData);
    }, [generalData])

    return (
        <div className="create_offer_page_container">
            <GeneralDataBlock setGeneralData={setGeneralData}/>

            <PhotosBlock photos={photos} setPhotos={setPhotos}/>

            <ContactDataBlock formData={contactData} setFormData={setContactData} />

            <button className="green_button" id="add_offer_button" onClick={createOffer}>Додати Оголошення</button>

            {error && <span className="small_text error_text">{error}</span>}
        </div>
    );
    
    function isFilled() {
        // Check general data
        const isGeneralDataValid = 
            generalData.title.trim() !== "" &&
            generalData.description.trim() !== "" &&
            !isNaN(Number(generalData.category)) && // Category should be a number
            !isNaN(parseFloat(generalData.price)) && // Price should be a valid number
            parseFloat(generalData.price) > 0; // Price should be positive

        // Check contact data
        const isContactDataValid = 
            contactData.contacter.trim() !== "" &&
            contactData.email.trim() !== "" &&
            contactData.phoneNumber.trim() !== "" &&
            contactData.address.trim() !== "";

        // Check at least first photo is set
        const isPhotoValid = photos[0] !== null;

        return isGeneralDataValid && isContactDataValid && isPhotoValid;
    }

    function showError(message){
        console.error(message);
        setError(message);
    }

    async function createOffer(){
        if(!isFilled()){
            showError("not all fields are filled or filled incorrectly")
            return;
        }

        try {
            const formData = new FormData();
                
            Object.entries(generalData).forEach(([key, value]) => {
                formData.append(key, value);
            });

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