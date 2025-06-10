import PersonalDataBlock from './PersonalDataBlock';
import MyOffersBlock from './MyOffersBlock';
import MessagesBlock from './MessagesBlock';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import useApi from '../Shared/UseApi';
import { useNavigate } from 'react-router';

function PersonalPage() {
    const [userData, setUserData] = useState(null);
    const { authorizedRequest } = useApi();
    const { baseUrl, setAccessToken } = useContext(AuthContext);
    // const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div id="personal_page_wrapper" className="horizontal_container">
            {userData ? (
                <>
                    <PersonalDataBlock data={{
                        username: userData.personalData.username,
                        firstName: userData.personalData.firstName,
                        lastName: userData.personalData.lastName,
                        city: userData.personalData.city,
                        postCode: userData.personalData.postCode,
                        address: userData.personalData.address,
                        apartmentNumber: userData.personalData.apartmentNumber,
                        email: userData.personalData.email,
                        phoneNumber: userData.personalData.phoneNumber
                    }}/>

                    <div id='personal_page_right_section' className="vertical_container">
                        <MyOffersBlock offers={userData.offers} />

                        <MessagesBlock />

                        <div className='horizontal_container'>
                            <button id='logout_button' className='green_button' onClick={logout}>logout</button>
                            <button id='logout_button' className='green_button' onClick={deleteAccount}>delete account</button>

                        </div>
                    </div>
                </>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
     );

     async function fetchUserData() {
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/personal-page`,
                method: "get"
            })

            if(response.status === 200){
                setUserData(response.data);
                console.log(response.data);
            }
        } catch(err) {
            console.error("failed to fetch user: ", err);
        }
    }

    async function logout(){
        setAccessToken(null)
        sessionStorage.removeItem('accessToken');
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/logout`,
                method: "post"
            })

            if(response.status === 200){
                console.log(response.data.message);
                setAccessToken(null)
                sessionStorage.removeItem('accessToken');
            }

            console.log(response.data.message);
            setAccessToken(null)
            sessionStorage.removeItem('accessToken');
        } catch(err) {
            console.error("failed to logout: ", err);
        }
    }

    async function deleteAccount(){
        setAccessToken(null)
        sessionStorage.removeItem('accessToken');
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/delete-user`,
                method: "delete"
            })

            if(response.status === 200){
                console.log(response.data.message);
                setAccessToken(null)
                sessionStorage.removeItem('accessToken');
            }

            console.log(response.data.message);
            setAccessToken(null)
            sessionStorage.removeItem('accessToken');
        } catch(err) {
            console.error("failed to delete: ", err);
        }
    }
}

export default PersonalPage;