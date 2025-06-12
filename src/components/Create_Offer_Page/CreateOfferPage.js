import { useContext, useEffect, useRef, useState } from "react";
import { data, useNavigate, useParams } from "react-router";
import useApi from "../Shared/UseApi";
import { AuthContext } from "../Shared/AuthContext";
import ContactDataBlock from "./ContactDataBlock";
import PhotosBlock from "./PhotosBlock";
import GeneralDataBlock from "./GeneralDataBlock";
import { jsx } from "react/jsx-runtime";

function CreateOfferPage() {
    const navigate = useNavigate();
    const { authorizedRequest } = useApi();
    const { baseUrl } = useContext(AuthContext);
    const [error, setError] = useState("");
    const { id } = useParams();

    const[generalData, setGeneralData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        state: ""
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
        if(id){
            console.log("fetching");
            fetchMyOffer();
        }
    }, [id])

    return (
        <div className="create_offer_page_container">
            <GeneralDataBlock setGeneralData={setGeneralData} generalData={id ? generalData : undefined}/>

            <PhotosBlock photos={photos} setPhotos={setPhotos}/>

            <ContactDataBlock formData={contactData} setFormData={setContactData} />

            <button className="green_button" id="add_offer_button" onClick={id ? editOffer : createOffer}>{id ? "Зберегти" : "Додати Оголошення"}</button>

            {error && <span className="small_text error_text">{error}</span>}
        </div>
    );

    function initializeData(offerData){
        console.log(offerData.title)
        setGeneralData({
            title: offerData.title,
            description: offerData.description,
            category: offerData.category,
            price: offerData.price,
            state: offerData.state
        })

        // setPhotos({
        //     0: offerData.images[0],

        // })
        setPhotos(
            Array.from({ length: 8 }, (_, index) => offerData.images[index] || null)
            .reduce((acc, img, idx) => ({ ...acc, [idx]: img }), {})
        );

        setContactData({
            contacter: offerData.contacter,
            email: offerData.email,
            phoneNumber: offerData.phoneNumber,
            address: offerData.address,
        })
    }

    async function fetchMyOffer() {
        try{
            console.log(id);
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/my-offer/${id}`,
                method: "get",
                // data: JSON.stringify({offerId: id})
            })

            if (response.status === 200) {
                // setOffers(response.data)
                console.log("offer data: ", response.data)
                initializeData(response.data);
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
    
    function isFilled() {
        // Check general data
        const isGeneralDataValid = 
            generalData.title.trim() !== "" &&
            generalData.description.trim() !== "" &&
            !isNaN(Number(generalData.category)) && // Category should be a number
            !isNaN(Number(generalData.state)) && // State should be a number
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

    async function editOffer(){
        if(!isFilled()){
            showError("not all fields are filled or filled incorrectly")
            return;
        }

        try {
            const formData = new FormData();

            formData.append("id", id);
                
            Object.entries(generalData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(contactData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(photos).forEach(([key, value]) => {
                console.log("photo ", key, " ", value);

                if(value == null){
                    return;
                }

                if(value.url){
                    console.log("cloudinary object")
                    // formData.append("Images", value);
                    formData.append(
                        `Images`,
                        JSON.stringify({
                            id: value.id,
                            url: value.url,
                            offerId: value.offerId
                        })
                    );
                }
                else if (typeof value === 'string' && value.startsWith('data:image')) {
                    console.log("image file")
                    const matches = value.match(/^data:(.+?);base64/);
                    const mimeType = matches?.[1] || 'image/png'; // Fallback to PNG if unknown
                    
                    // Map MIME type to correct extension
                    const extension = mimeType.split('/')[1] || 'png';
                    
                    // Create file with proper extension
                    const file = dataURLtoFile(value, `image_${key}.${extension}`);
                    // formData.append("Images", file);
                    // formData.append(`Images[${key}].FileImage`, file);
                    formData.append(
                        `Images`,
                        {
                            cloudinaryImage: null,
                            FileImage: file
                        }
                        // file
                    );
                }
                else{
                    console.log("unexpected data type")
                }

                // Extract the real MIME type from the Data URL
            });
            
            console.log(formData);

            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/offer/edit-offer`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
    
            if (response.status === 200) {
                console.log("Offer edited successfully");
                // navigate("/");
            }
        } catch (err) {
            console.error('Failed to edit offer:', err);
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