import { useParams } from 'react-router-dom';
import BuySection from './BuySection';
import InfoSection from './InfoSection';
import { useEffect, useState } from 'react';
import useApi from '../Shared/UseApi';
import { useAuth } from '../Shared/AuthContext';
import { Photo } from '../../models/Photo';

export interface OfferData{
    images: Photo[],
    category: number,
    state: number,
    description: string,
    address: string,
    creationDate: string,
    title: string,
    price: number,
    contacter: string,
    email: string,
    phoneNumber: string
}

function OfferPage() {
    const { id } = useParams<{ id: string }>();
    const [offerData, setOfferData] = useState<OfferData>()
    const { authorizedRequest } = useApi()
    const { baseUrl } = useAuth();

    useEffect(() => {
        fetchOfferData();
        console.log(offerData);
    }, [id])

    useEffect(() =>{
        console.log(offerData);
    }, [offerData])
    
    if (!id) {
        return <div>Error: Missing offer ID</div>;
    }

    return ( 
        <div className='offer_page_container horizontal_container'>
            {offerData ? (
                <>
                    <InfoSection data={{
                        photos: offerData.images,
                        category: offerData.category,
                        description: offerData.description,
                        id: parseInt(id),
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