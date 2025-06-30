import { useContext, useEffect, useState } from "react";
import useApi from "../Shared/UseApi";
import { useAuth } from "../Shared/AuthContext";
import { Grid } from "@mui/material";
import OfferElement from "../Main_Page/OfferElement";

interface OfferPreview{
    id: number,
    previewImageUrl: string,
    title: string,
    price: number,
}

function FavoritesPage() {
    const { baseUrl } = useAuth();
    const [favorites, setFavorites] = useState<OfferPreview[]>([]);
    const { authorizedRequest } = useApi()

    useEffect(() => {
        fetchFavorites();
    }, [])

    useEffect(() => {
        console.log(favorites);
    }, [favorites])

    return (
        <div className="offers_display_page">
            <h1 className="large_heading">Вибрані</h1>
            {favorites ? (
                <>
                    {favorites.length == 0 && <span className="small_text">Вибрані оголошення з'являтимуться тут</span>}
                    <div className="offers_block">
                        <Grid container spacing={2} className="offers_grid">
                            {favorites.map((offer, index) =>
                                <OfferElement key={index} offerData={offer} linkUrl={"offer"} onFavoriteClick={(id) => {
                                    console.log("remove favorite ", id);
                                    setFavorites(prev => prev.filter(offer => offer.id !== id));
                                }}/>
                            )}
                            
                        </Grid>
                        
                    </div>
                </>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
     );

     async function fetchFavorites() {
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/favorite/get-user-favorites`
            })

            if(response.status === 200){
                setFavorites(response.data)
            }
        } catch(err) {
            console.error("failed to fetch favorites: ", err)
        }
     }
}

export default FavoritesPage;