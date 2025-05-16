import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
    return (
        <header>
            <Link to="/" id='logo_nav_link'>
                <span className='logo'>
                    <span id='gradient_part'>ШУКАЙ</span>
                    <span id='green_part'>КА</span>
                </span>
            </Link>

            <div className='search_bar'>
                <img src='img/search_icon.png'/>
                <input type='text' placeholder='Пошук...' id='search_input'/>
            </div>

            <nav>
                <Link to="/favorites"><img src='img/favorite_icon.png'/></Link>
                <Link to="/create-offer" id='nav_plus'><img src='img/plus_icon.png'/></Link>
                <Link to="/me"><img src='img/me_icon.png'/></Link>
            </nav>
        </header>
    );
}

export default Header;