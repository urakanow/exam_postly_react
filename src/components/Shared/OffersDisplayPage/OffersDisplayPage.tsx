import { ReactNode } from "react";
import './style.css';

interface OfferDisplayPageProps {
    title: string,
    children: ReactNode
}

function OffersDisplayPage({ title, children }: OfferDisplayPageProps) {
    return (
        <div className="offers_display_page">
            <h1 className="large_heading">{title}</h1>
            {children}
        </div>
    );
}

export default OffersDisplayPage;