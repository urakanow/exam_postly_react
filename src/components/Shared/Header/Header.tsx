import Logo from '../Logo/Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import './style.css';
import '../../../App.css'

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