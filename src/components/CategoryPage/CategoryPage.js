import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Shared/AuthContext";
import OfferElement from "../Main_Page/OfferElement";
import { Grid } from "@mui/material";

function CategoryPage() {
    const { categoryIndex } = useParams();
    const { baseUrl, options } = useContext(AuthContext);

    const [offers, setOffers] = useState(null);

    useEffect(() => {
        fetchCategoryOffers({
            category: categoryIndex,
            pageSize: 20
        })
    }, [])
    return (
        <div className="offers_display_page">
            <h1 className="large_heading">{options[categoryIndex]}</h1>
            {offers ? (
                <div className="offers_block">
                    <Grid container spacing={2} className="offers_grid">
                        {offers.map((offer, index) =>
                            <OfferElement key={index} offerData={offer} linkUrl={"offer"} />
                        )}
                    </Grid>
                </div>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
    );

    async function fetchCategoryOffers(filters = {}){
        try{
            const params = new URLSearchParams();
                
            if (filters.category != undefined) params.append('categoryId', filters.category);
            if (filters.page != undefined) params.append('page', filters.page);
            if (filters.pageSize != undefined) params.append('pageSize', filters.pageSize);

            const response = await fetch(`${baseUrl}/offer/filtered-offers?${params.toString()}`, {
                method: 'get',
            })


            if (response.status === 200) {
                const data = await response.json();
                setOffers(data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default CategoryPage;