import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import useApi from '../Shared/UseApi';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

function MyOfferPage() {
    const { id } = useParams();
    const { baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();
    const [offerData, setOfferData] = useState(null);
    const [image, setImage] = useState(null)
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const navigate = useNavigate();
    const [showSaveButton, setShowSaveButton] = useState(false);
    
    useEffect(() => {
        populateOfferData();
    }, [])
    
    function offerEdited() {
        if(!showSaveButton){
            setShowSaveButton(true);
        }       
    }

    const handleTitleChange = (e) => {
        setOfferData(prev => ({
            ...prev,
            title: e.target.value
        }));
        
        offerEdited();
    };

    function isDouble(str) {
        // Trim whitespace and check if empty
        if (typeof str !== 'string' || str.trim() === '') {
            return false;
        }
        
        // Convert to number
        const num = Number(str);
        
        // Check if it's a finite number (not NaN, not Infinity)
        return !isNaN(num) && isFinite(num);
    }

    const handlePriceChange = (e) => {
        let enteredPrice = e.target.value
        
        if(!isDouble(enteredPrice)){
            
            return;
        }

        setOfferData(prev => ({
            ...prev,
            price: enteredPrice
        }));

        offerEdited();
    };

    return ( 
        <>
            {offerData == null ? (
                <>
                    loading...
                </>
            ) : (
                <>
                    <input type='text' value={offerData.title} onChange={handleTitleChange}></input>
                    {image && (
                        <AdvancedImage cldImg={image} />
                    )}
                    <p>{offerData.price}€</p>
                    <input type='text' value={offerData.price} onChange={handlePriceChange}></input>{/*€*/}
                </>
            )}
            <div>
                <button onClick={() => deleteOffer()}>Delete Offer</button>
                {showSaveButton && (
                    <button onClick={() => editOffer()}>Save</button>
                )} 
            </div>
        </>
    );


    async function populateOfferData(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/offer/offer/${id}`
            })

            if(response.status === 200){
                setOfferData(response.data)
                setImage(cld
                    .image(response.data.imageUrl)
                    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
                    .quality('auto')
                    .resize(auto().gravity(autoGravity()).width(250).height(250)) // Transform the image: auto-crop to square aspect_ratio
                )
            }
        } catch (err) {
            console.error("failed to fetch offer: ", err)
        }
    }

    async function deleteOffer(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/offer/delete-offer`,
                data: JSON.stringify(id)
            })

            if(response.status === 200){
                console.log(response.data.message)
                navigate("/my-offers")
            }
        } catch(err) {
            console.error("failed to delete offer: ", err)
        }
    }

    async function editOffer(){
        try{
            const response = await authorizedRequest({
                method: 'update',
                url: `${baseUrl}/offer/edit-offer`,
                data: JSON.stringify(offerData)
            })

            if(response.status === 200){
                console.log(response.data.message)
                setShowSaveButton(false)
            }
        } catch(err) {
            console.error("failed to edit offer: ", err)
        }
        console.log("offer editing saved")
    }
}

export default MyOfferPage;