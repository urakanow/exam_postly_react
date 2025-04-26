import { useState, useEffect, useContext } from "react";
import OfferInfoPage from "./OfferInfoPage";
import { AuthContext } from "./AuthContext";
import useApi from "./UseApi";

function OffersDisplayPage() {
    const [offers, setOffers] = useState(null);
    const { accessToken, setAccessToken, baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();

    useEffect(() => {
        populateOffers();
    }, []);

    return ( 
        offers ? (
            <div className="offer-container">
                {offers.map(offer => 
                    <OfferInfoPage offerData={offer} />
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
                // console.log(response.json());
            }
        } catch (err) {
            console.error('Failed to fetch offers:', err);
        }

    }
}

export default OffersDisplayPage;