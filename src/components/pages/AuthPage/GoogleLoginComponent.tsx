import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../Shared/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const basename = process.env.REACT_APP_BASENAME;

function GoogleLoginComponent() {
    const { baseUrl, setAccessToken } = useAuth();
    
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
        
    function onError(){
        console.log("error")
    }

    return (
        <div id="google_button">
            <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            />
        </div>
    );
    
    async function onSuccess(response: CredentialResponse){
        console.log("success, ", response)
        try{
            const apiResponse = await fetch(`${baseUrl}/googleauth/authorize`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(response.credential),
                credentials: "include"
            });

            const data = await apiResponse.json();
            console.log(data);
            if (apiResponse.ok) {
                setAccessToken(data.accessToken);
                navigate(from, {replace: true})
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export default GoogleLoginComponent;