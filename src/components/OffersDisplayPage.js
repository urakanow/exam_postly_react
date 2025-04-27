import { useState, useEffect, useContext } from "react";
import OfferInfoPage from "./OfferElement";
import { AuthContext } from "./AuthContext";
import useApi from "./UseApi";

function OffersDisplayPage() {
    const [offers, setOffers] = useState([]);
    const { accessToken, setAccessToken, baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();

    useEffect(() => {
        populateOffers();
    }, []);

    return ( 
        offers.length > 0 ? (
            <div className="offer-container">
                {offers.map(offer => 
                    <OfferInfoPage offerData={offer} key={offer.id}/>
                )}
            </div>
        ) : (
            <>
                there isnt any offers
            </>
        )
    );

    async function populateOffers(){
        try {
            const response = await fetch(`${baseUrl}/offer/offers`, {
                method: 'get'
            });
            if (response.status === 200) {
                const data = await response.json();
                setOffers(data);
                console.log(data);
            }
        } catch (err) {
            console.error('Failed to fetch offers:', err);
        }

    }
}

export default OffersDisplayPage;