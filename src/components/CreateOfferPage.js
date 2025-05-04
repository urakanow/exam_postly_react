import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import useApi from './UseApi';
import { useNavigate } from 'react-router-dom';
import UploadWidget from './UploadWidget';

function CreateOfferPage() {
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const { baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();
    const navigate = useNavigate();

    return ( 
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                CreateOffer();
            }}>
                <label>Title</label><br />
                <input type="text" name="title_name" onChange={(e) => setTitle(e.target.value)} /><br />

                <label>Price</label><br />
                <input type="text" name="price_name" onChange={(e) => setPrice(e.target.value)} /><br />
                
                {/* <label>Image Url</label><br />
                <input type="text" name="image_url_name" onChange={(e) => setImage(e.target.value)} /><br /> */}
                
                <label>Image</label><br />
                <input type="file" name="image_url_name" onChange={(e) => setImage(e.target.files[0])} /><br />

                <button type='submit'>Publish</button>
            </form>

            <UploadWidget />
        </>
    );

    // async function CreateOffer() {
    //     try {
    //         const response = await authorizedRequest({
    //             headers: {
    //                 // "Content-Type": "application/json"
    //                 "Content-Type": "multipart/form-data"
    //             },
    //             method: 'post',
    //             url: `${baseUrl}/offer/create-offer`,
    //             data: {title, price, image}
    //         });

    //         if (response.status === 200) {
    //             //const data = awaitresponse.json();
    //             console.log("offer created succesfully");
    //             // setUserData(response.data);
    //             navigate("/");
    //         }
    //     } catch (err) {
    //         console.error('Failed to fetch user data:', err);
    //     }
    // }

    async function CreateOffer() {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('image', image); // This is the File object
    
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/offer/create-offer`,
                data: formData,  // Send FormData instead of JSON
                headers: {
                    // Remove Content-Type header - axios will set it automatically
                    // with the correct boundary for multipart/form-data
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