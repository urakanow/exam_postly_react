import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/favorites"><img src='img/favorite_icon.png'/></Link>
            <Link to="/create-offer" id='nav_plus'><img src='img/plus_icon.png'/></Link>
            <Link to="/me"><img src='img/me_icon.png'/></Link>
        </nav>
     );
}

export default Navigation;