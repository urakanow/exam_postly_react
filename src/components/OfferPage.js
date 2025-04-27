import { useParams } from 'react-router-dom';

function OfferPage() {
    const { title } = useParams();

    return ( 
        <>
            {title}
        </>
    );
}

export default OfferPage;