import '../../App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ReactNode } from 'react';

function Layout({ children }: {children: ReactNode}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;