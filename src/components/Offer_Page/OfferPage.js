import { useParams } from 'react-router-dom';
import BuySection from './BuySection';
import InfoSection from './InfoSection';
import { useContext, useEffect, useState } from 'react';
import useApi from '../Shared/UseApi';
import { AuthContext } from '../Shared/AuthContext';

function OfferPage() {
    const { id } = useParams();
    const [offerData, setOfferData] = useState(null)
    const { authorizedRequest } = useApi()
    const { baseUrl } = useContext(AuthContext);

    useEffect(() => {
        fetchOfferData();
        console.log(offerData);
    }, [id])

    useEffect(() =>{
        console.log(offerData);
    }, [offerData])

    return ( 
        <div className='offer_page_container horizontal_container'>
            {offerData ? (
                <>
                    <InfoSection data={{
                        photos: offerData.images,
                        category: offerData.category,
                        description: offerData.description,
                        id: id,
                        address: offerData.address
                    }}/>
    
                    <BuySection data={{
                        creationDate: offerData.creationDate,
                        title: offerData.title,
                        price: offerData.price,
                        username: offerData.contacter,
                        phoneNumber: offerData.phoneNumber
                    }} />
                </>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
    );

    async function fetchOfferData() {
        try{
            // const response = await authorizedRequest({
            //     method: 'get',
            //     url: `${baseUrl}/offer/offer/${id}`
            // })
            const response = await fetch(`${baseUrl}/offer/offer/${id}`, {
                method: 'get',
                // url: `${baseUrl}/offer/filtered-offers?${params.toString()}`
            })

            if(response.status === 200){
                const data = await response.json();

                setOfferData(data);
            }
        } catch(err){
            console.error("failed to fetch offer data: ", err)
        }
    }
}

export default OfferPage;