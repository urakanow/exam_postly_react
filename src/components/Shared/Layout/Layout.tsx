import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ReactNode } from 'react';
import './style.css'

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