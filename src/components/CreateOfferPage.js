import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import useApi from './UseApi';
import { useNavigate } from 'react-router-dom';
import UploadWidget from './UploadWidget';

function CreateOfferPage() {
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState();
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
                
                <label>Image Url</label><br />
                <input type="text" name="image_url_name" onChange={(e) => setImageUrl(e.target.value)} /><br />

                <button type='submit'>Publish</button>
            </form>

            <UploadWidget />
        </>
    );

    async function CreateOffer() {
        try {
            const response = await authorizedRequest({
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'post',
                url: `${baseUrl}/offer/create-offer`,
                data: {title, price, imageUrl}
            });

            if (response.status === 200) {
                //const data = awaitresponse.json();
                console.log("offer created succesfully");
                // setUserData(response.data);
                navigate("/");
            }
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        }
    }

}

export default CreateOfferPage;