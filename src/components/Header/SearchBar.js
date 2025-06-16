import { AdvancedImage } from '@cloudinary/react';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from "react-router";

function SearchBar() {
    const inputRef = useRef(null);
    const { baseUrl } = useContext(AuthContext);
    const { cld } = useContext(AuthContext);    
    const search_image = cld.image("search_icon_etyytt");
    const location = useLocation();
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();


    function isOnSearchPage(){
        return location.pathname === "/search"
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
            <input ref={inputRef} type='search' placeholder='Пошук...' id='search_input' 
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    search(e.target.value);
                }
            }}/>
        </div>
    );

    function search(query){
        inputRef.current.blur();
        if(isOnSearchPage()){
            console.log("is on search page")
            console.log(location.pathname === "/search")
            handleFilterChange(query);
        }
        else{
            navigate(`/search?${new URLSearchParams({title: query})}`)
            console.log("is on main page")
            // window.href = `/search`;
            // navigate("/search")
        }
        
    }
}

export default SearchBar;