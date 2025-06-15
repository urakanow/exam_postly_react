import { Grid, Grow } from "@mui/material";
import OfferElement from "./OfferElement";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Shared/AuthContext";
import useApi from "../Shared/UseApi";
import { useNavigate } from "react-router";


function OffersBlock({ categoryIndex }) {
    const { options, baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();
    const [offers, setOffers] = useState([])

    const navigate = useNavigate();

    const pageSize = 4;

    useEffect(() => {
        FetchFilteredOffers({
            category: categoryIndex,
            pageSize: pageSize
        })
    }, [categoryIndex])

    return (
        <div className="offers_block">
            <h1 className="category_name">{options[categoryIndex]}</h1>

            <Grid container spacing={2} className="offers_grid">
                {offers.map((offer, index) =>
                    <OfferElement key={index} offerData={offer} linkUrl={"offer"}/>
                )}

                {Array.from({ length: Math.max(0, pageSize - offers.length) }).map((_, index) => (
                    <OfferElement key={`placeholder-${index}`} />
                ))}

            </Grid>

            <button className="see_more" onClick={() => navigate(`/category/${categoryIndex}`)}>Див. більше</button>
        </div>
    );

    async function FetchFilteredOffers(filters = {}){
        try{
            const params = new URLSearchParams();
                
            if (filters.category != undefined) params.append('categoryId', filters.category);
            if (filters.page != undefined) params.append('page', filters.page);
            if (filters.pageSize != undefined) params.append('pageSize', filters.pageSize);

            // const response = await authorizedRequest({
            //     method: 'get',
            //     url: `${baseUrl}/offer/filtered-offers?${params.toString()}`
            // })
            const response = await fetch(`${baseUrl}/offer/filtered-offers?${params.toString()}`, {
                method: 'get',
                // url: `${baseUrl}/offer/filtered-offers?${params.toString()}`
            })

            // const response = await fetch(`${baseUrl}/user/signup`, {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({ username, email, phoneNumber, password }),
            //     credentials: "include"
            // });

            if (response.status === 200) {
                const data = await response.json();
                // console.log(data)
                setOffers(data)
                // console.log("Offers fetched successfully", filters.category, response.data);
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default OffersBlock;