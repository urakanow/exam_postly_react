import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AuthContext } from "../Shared/AuthContext";
import { Grid } from "@mui/material";
import OfferElement from "../Main_Page/OfferElement";
import CategoryDropdown from "../Create_Offer_Page/CategoryDropdown";
import StateDropdown from "../Create_Offer_Page/StateDropdown";

function SearchPage() {
    const { baseUrl } = useContext(AuthContext);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const filters = {
        title: searchParams.get('title') || '',
        categoryId: searchParams.get('categoryId') || '',
        state: searchParams.get('state') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    };
    const [offers, setOffers] = useState([]);

    // const handleFilterChange = (newFilters) => {
    //     const params = new URLSearchParams(searchParams);
        
    //     // Update only changed filters
    //     Object.entries(newFilters).forEach(([key, value]) => {
    //     if (value) params.set(key, value);
    //     else params.delete(key); // Remove empty filters
    //     });

    //     setSearchParams(params);
    // };
    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams);
        
        // Update only changed filters
        if (value || value == 0) params.set(key, value);
        else params.delete(key); // Remove empty filters

        setSearchParams(params);
    };

    const handleCategoryChange = (index) => {
        handleFilterChange("categoryId", index)
    }

    const handleStateChange = (index) => {
        console.log("state: ", index);
    }

    const handleMinPriceChange = (e) => {
        console.log("min price: ", e.target.value);
        handleFilterChange("minPrice", e.target.value);
    }
    const handleMaxPriceChange = (e) => {
        console.log("max price: ", e.target.value);
        handleFilterChange("maxPrice", e.target.value);
    }

    useEffect(() => {
        const currentFilters = {
            title: searchParams.get('title') || '',
            categoryId: searchParams.get('categoryId') || '',
            state: searchParams.get('state') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
        };
        search(currentFilters);
    }, [searchParams])

    return (
        <div className="offers_display_page">
            <h1 className="large_heading">Фільтри</h1>
            <CategoryDropdown selectedIndex={filters.categoryId ? filters.categoryId : undefined} onChange={(index) => handleFilterChange("categoryId", index)} />
            <StateDropdown selectedIndex={filters.state ? filters.state : undefined} onChange={(index) => handleFilterChange("state", index)}/>
            <input type="number" min={0} defaultValue={filters.minPrice ? filters.minPrice : undefined} placeholder="від" onChange={handleMinPriceChange}/>
            <input type="number" min={1} defaultValue={filters.maxPrice ? filters.maxPrice : undefined} placeholder="до" onChange={handleMaxPriceChange}/>
            <h1 className="large_heading">Результати пошуку</h1>
            {offers ? (
                <div className="offers_block horizontal_container">
                    <Grid container direction="row" sx={{justifyContent: "flex-start"}} spacing={2} className="offers_grid">
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
                
            if (filters.page !== undefined) params.append('page', filters.page);
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize);
            if (filters.title) params.append('title', filters.title);
            if (filters.categoryId) params.append('categoryId', filters.categoryId);
            if (filters.state) params.append('state', filters.state);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

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