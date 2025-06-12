import { useParams } from "react-router";

function MyOfferPage() {
    const { id } = useParams();

    return (
        <>
            my offer page
            {id}
        </>
    );
}

export default MyOfferPage;