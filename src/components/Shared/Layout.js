import '../../App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;