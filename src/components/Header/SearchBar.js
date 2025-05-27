import { AdvancedImage } from '@cloudinary/react';
import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';

function SearchBar() {
    const { cld } = useContext(AuthContext);    
    const search_image = cld.image("search_icon_etyytt");

    return (
        <div className='search_bar'>
            {/* <img src='img/search_icon.png'/> */}
            <AdvancedImage cldImg={search_image} />
            <input type='text' placeholder='Пошук...' id='search_input'/>
        </div>
     );
}

export default SearchBar;