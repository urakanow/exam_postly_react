import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import useApi from './UseApi';
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

    useEffect(() => {
        populateOfferData();
    }, [])

    return ( 
        <>
            {offerData == null ? (
                <>
                    loading...
                </>
            ) : (
                <>
                    <h2>{offerData.title}</h2>
                    {image && (
                        <AdvancedImage cldImg={image} />
                    )}
                    <p>{offerData.price}€</p>
                </>
            )}
            <div>
                <button onClick={() => deleteOffer()}>Delete Offer</button>
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
}

export default MyOfferPage;