import { Grid, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import useApi from "../../../hooks/UseApi";
import { OfferPreview } from "../../../models/OfferPreview";
import MyOfferElement from "./MyOfferElement";

function MyOffersBlock() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [offers, setOffers] = useState<OfferPreview[]>([])

    useEffect(() => {
        fetchMyOffers()
    }, [])

    return (
        <div className="offers_block">
            <Grid container spacing={2} className="offers_grid">
                {offers.map((offer, index) =>
                    // <MyOfferElement key={index} offerData={offer} onDelete={() => setOffers(offers.splice(index, 1))} />
                    <MyOfferElement key={index} offerData={offer} onDelete={() => setOffers(offers.splice(index, 1))} />//TODO: leaves the element the only one on the page instead of deleting
                )}
            </Grid>
        </div>
    );

    async function fetchMyOffers(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/my-offers`,
                method: "get"
            })

            if (response.status === 200) {
                setOffers(response.data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default MyOffersBlock;