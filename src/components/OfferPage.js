import { useParams } from 'react-router-dom';

function OfferPage() {
    const { id } = useParams();

    return ( 
        <>
            {id}
        </>
    );
}

export default OfferPage;