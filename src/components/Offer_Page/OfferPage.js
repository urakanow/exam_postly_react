import { useParams } from 'react-router-dom';
import BuySection from './BuySection';
import InfoSection from './InfoSection';

function OfferPage() {
    const { id } = useParams();
    
    return ( 
        <div className='offer_page_container horizontal_container'>
            <InfoSection />

            <BuySection />
        </div>
    );
}

export default OfferPage;