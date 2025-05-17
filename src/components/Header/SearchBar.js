function SearchBar() {
    return (
        <div className='search_bar'>
            <img src='img/search_icon.png'/>
            <input type='text' placeholder='Пошук...' id='search_input'/>
        </div>
     );
}

export default SearchBar;