import '../../App.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';

function Header() {
    return (
        <header>
            <Logo />

            <SearchBar />

            <Navigation />
        </header>
    );
}

export default Header;