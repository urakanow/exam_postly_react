import { Link } from 'react-router-dom';

function Logo({ id="" }) {
    return (
        <Link to="/" id='logo_nav_link'>
            <span className='logo' id={id || undefined}>
                <span id='gradient_part'>ШУКАЙ</span>
                <span id='green_part'>КА</span>
            </span>
        </Link>
     );
}

export default Logo;