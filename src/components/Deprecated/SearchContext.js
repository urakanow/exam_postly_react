import { createContext } from "react";

export const SearchContext = createContext();

function SearchProvider() {
    return (
        <SearchContext.Provider value={
            value
        }/>
    );
}

export default SearchProvider;