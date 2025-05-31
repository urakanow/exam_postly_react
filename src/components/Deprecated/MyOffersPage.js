import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import useApi from "../Shared/UseApi";
import { Grid } from "@mui/material";
import OfferElement from "./OfferElement";

function MyOffersPage() {
    const [offers, setOffers] = useState([]);
    const { accessToken, setAccessToken, baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();   

    useEffect(() => {
        populateOffers();
    }, []);

    return ( 
        offers.length > 0 ? (
            <Grid container spacing={2} className="offer-container">
                {offers.map(offer => 
                    <OfferElement offerData={offer} linkUrl={"/my-offer"} key={offer.id}/>
                )}
            </Grid>
        ) : (
            <>
                there isnt any offers
            </>
        )
    );

    async function populateOffers(){
        try {
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/offer/my-offers`
            });
            if (response.status === 200) {
                // const data = await response.json();
                setOffers(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch offers:', err);
        }

    }
}

export default MyOffersPage;