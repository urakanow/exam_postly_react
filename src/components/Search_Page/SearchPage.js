import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AuthContext } from "../Shared/AuthContext";
import { Grid } from "@mui/material";
import OfferElement from "../Main_Page/OfferElement";

function SearchPage() {
    const { baseUrl } = useContext(AuthContext);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const filters = {
        title: searchParams.get('title') || '',
        categoryId: searchParams.get('categoryId') || '',
        // minPrice: searchParams.get('minPrice') || '',
        // maxPrice: searchParams.get('maxPrice') || '',
        // state: searchParams.get('state') || '',
    };
    const [offers, setOffers] = useState([]);

    const handleFilterChange = (newFilters) => {
        const params = new URLSearchParams(searchParams);
        
        // Update only changed filters
        Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key); // Remove empty filters
        });

        setSearchParams(params);
    };

    useEffect(() => {
        const currentFilters = {
            title: searchParams.get('title') || '',
            categoryId: searchParams.get('categoryId') || ''
        };
        search(currentFilters);
    }, [searchParams])

    return (
        <div className="offers_display_page">
            <h1 className="large_heading">Результати пошуку</h1>
            {offers ? (
                <div className="offers_block">
                    <Grid container spacing={2} className="offers_grid">
                        {offers.map((offer, index) =>
                            <OfferElement key={index} offerData={offer} linkUrl={"offer"} />
                        )}
                        {offers.length == 0 && <span className="small_text">Не знайдено оголошень, що відповідають пошуку</span>}
                    </Grid>
                    
                </div>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
    );

    async function search(filters = {}){
        try{
            const params = new URLSearchParams();
                
            if (filters.categoryId) params.append('categoryId', filters.categoryId);
            if (filters.page !== undefined) params.append('page', filters.page);
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize);
            if (filters.title) params.append('title', filters.title);

            const response = await fetch(`${baseUrl}/offer/filtered-offers?${params.toString()}`, {
                method: 'get',
            })


            if (response.status === 200) {
                const data = await response.json();
                setOffers(data)
                console.log(data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default SearchPage;