import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../Shared/AuthContext";
import { Grid } from "@mui/material";
import OfferElement from "../Main_Page/OfferElement";
import { DropdownMenu } from "../Create_Offer_Page/DropdownMenu";
import { OfferPreview } from "../../models/OfferPreview";
import { Filters } from "../../models/Filters";
// import CategoryDropdown from "../Create_Offer_Page/CategoryDropdown";
// import StateDropdown from "../Create_Offer_Page/StateDropdown";

function SearchPage() {
    const { baseUrl, categories } = useAuth();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const filters: Filters = {
        title: searchParams.get('title') || '',
        categoryIndex: Number(searchParams.get('categoryId') || ''),
        state: Number(searchParams.get('state') || ''),
        minPrice: Number(searchParams.get('minPrice') || ''),
        maxPrice: Number(searchParams.get('maxPrice') || ''),
    };
    const [offers, setOffers] = useState<OfferPreview[]>([]);

    // const handleFilterChange = (newFilters) => {
    //     const params = new URLSearchParams(searchParams);
        
    //     // Update only changed filters
    //     Object.entries(newFilters).forEach(([key, value]) => {
    //     if (value) params.set(key, value);
    //     else params.delete(key); // Remove empty filters
    //     });

    //     setSearchParams(params);
    // };
    const handleFilterChange = (key: string, value: number) => {
        const params = new URLSearchParams(searchParams);
        
        // Update only changed filters
        if (value || value == 0) params.set(key, value.toString());
        else params.delete(key); // Remove empty filters

        setSearchParams(params);
    };

    const handleCategoryChange = (index: number) => {
        handleFilterChange("categoryId", index)
    }

    const handleStateChange = (index: number) => {
        console.log("state: ", index);
    }

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("min price: ", e.target.value);
        const minPrice = Number(e.target.value);
        // if(filters.maxPrice && minPrice >= filters.maxPrice){
            
        //     return;
        // }
        handleFilterChange("minPrice", minPrice);
    }
    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("max price: ", e.target.value);
        handleFilterChange("maxPrice", Number(e.target.value));
    }

    useEffect(() => {
        const currentFilters: Filters = {
            title: searchParams.get('title') || undefined,
            // categoryIndex: Number(searchParams.get('categoryId')) || undefined,
            categoryIndex: searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
            state: Number(searchParams.get('state')) || undefined,
            minPrice: Number(searchParams.get('minPrice')) || undefined,
            maxPrice: Number(searchParams.get('maxPrice')) || undefined,
        };
        search(currentFilters);
    }, [searchParams])

    return (
        <div className="offers_display_page">
            <h1 className="large_heading">Фільтри</h1>

            {/* <CategoryDropdown selectedIndex={filters.categoryId ? filters.categoryId : undefined} onChange={(index) => handleFilterChange("categoryId", index)} /> */}
            <DropdownMenu
            items={categories}
            onSelect={(index) => handleCategoryChange(index)}
            initialText="Виберіть категорію"
            selectedIndex={filters?.categoryIndex ? filters?.categoryIndex : undefined}
            />

            {/* <StateDropdown selectedIndex={filters.state ? filters.state : undefined} onChange={(index) => handleFilterChange("state", index)}/> */}

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

    async function search(filters: Filters ){
        try{
            const params = new URLSearchParams();
                
            if (filters.pageIndex !== undefined) params.append('page', filters.pageIndex.toString());
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize.toString());
            if (filters.title !== undefined) params.append('title', filters.title);
            if (filters.categoryIndex !== undefined) params.append('categoryId', filters.categoryIndex.toString());
            if (filters.state !== undefined) params.append('state', filters.state.toString());
            if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());

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