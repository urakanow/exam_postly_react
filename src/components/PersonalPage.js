import { useEffect, useState, useContext } from 'react';
import '../App.css';
import { AuthContext } from './AuthContext';
import useApi from './UseApi';
import AuthForm from './AuthForm';

function PersonalPage() {
    const [userData, setUserData] = useState(null);
    const { accessToken, setAccessToken, baseUrl } = useContext(AuthContext);
    const { authorizedRequest } = useApi();

    useEffect(() => {
        populateUserData();
    }, [accessToken]);

    return (
        <div>
            {userData ? (
                <div>
                    {userData.username}
                    {userData.email}
                    <button type='button' onClick={() => logout()}>logout</button>
                </div>
            ) : (
                <div>
                    username placeholder 
                    email placeholder
                </div>
            )}
            {!accessToken && ( <AuthForm/> )}
        </div>
    );

    async function populateUserData() {
        try {
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/user/personal-page`
            });

            if (response.status === 200) {
                //const data = awaitresponse.json();
                console.log(response.data);
                setUserData(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        }
    }

    async function logout(){
        try {
            const response = await authorizedRequest({
                method: 'POST',
                url: `${baseUrl}/user/logout`,
            });

            if (response.status === 200) {
                console.log(response.data.message);
                setAccessToken(null);
                setUserData(null);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    }
}

export default PersonalPage;