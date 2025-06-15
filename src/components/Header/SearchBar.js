import { AdvancedImage } from '@cloudinary/react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from "react-router";

function SearchBar() {
    const { baseUrl } = useContext(AuthContext);
    const { cld } = useContext(AuthContext);    
    const search_image = cld.image("search_icon_etyytt");
    const location = useLocation();
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();


    function isOnSearchPage(){
        console.log("current url: ", location.pathname === "/search")
        return false
    }

    const handleFilterChange = (title) => {
        const params = new URLSearchParams(searchParams);
        
        if (title) params.set("title", title);
        else params.delete("title");

        setSearchParams(params);
    };

    return (
        <div className='search_bar'>
            <AdvancedImage cldImg={search_image} />
            <input type='search' placeholder='Пошук...' id='search_input' 
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    search(e.target.value);
                }
            }}/>
        </div>
    );

    function search(query){
        if(isOnSearchPage){
            handleFilterChange(query);
        }
        else{
            navigate(`/search?${new URLSearchParams({title: query})}`)
        }
        
    }
}

export default SearchBar;