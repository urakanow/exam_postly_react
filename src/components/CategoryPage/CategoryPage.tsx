import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../Shared/AuthContext";
import { Grid } from "@mui/material";
import { Offer } from "../../models/Offer";
import { OfferPreview } from "../../models/OfferPreview";
import OfferElement from "../Main_Page/OfferElement";
import { Filters } from "../../models/Filters";

function CategoryPage() {
    const { categoryIndex } = useParams();
    const categoryId = parseInt(categoryIndex || "") || 0;
    const { baseUrl, categories } = useAuth();

    const [offers, setOffers] = useState<OfferPreview[]>();

    useEffect(() => {
        fetchCategoryOffers({
            categoryIndex: categoryId,
            pageSize: 20
        })
    }, [])
    return (
        <div className="offers_display_page">
            <h1 className="large_heading">{categories[categoryId]}</h1>
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

    async function fetchCategoryOffers(filters: Filters){
        try{
            const params = new URLSearchParams();
                
            if (filters.categoryIndex !== undefined) params.append('categoryId', filters.categoryIndex.toString());
            else { return; }
            if (filters.pageIndex !== undefined) params.append('page', filters.pageIndex.toString());
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize.toString());

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