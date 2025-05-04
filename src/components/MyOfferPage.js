import { useParams } from 'react-router-dom';


function MyOfferPage() {
    const { id } = useParams();

    return ( 
        <>
            {id}
        </>
    );
}

export default MyOfferPage;