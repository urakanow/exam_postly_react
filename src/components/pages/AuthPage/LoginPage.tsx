import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../Shared/AuthContext/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AxiosResponse } from 'axios';
import './style.css';
import Error from "../../Shared/Error/Error";
import AuthInputField from './AuthInputField';

function LoginPage() {
    const { cld } = useAuth();
    const login_image = cld.image("login_icon_h5yruj")
    const password_image = cld.image("password_icon_vilhyw")
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl, setAccessToken } = useAuth();
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Вхід</h1>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    signin();
                }}>
                    <div className='auth_input_container vertical_container'>
                        <AuthInputField type="text" cldImg={login_image}
                        minLength={3} maxLength={20} placeholder="Логін"
                        onChange={(e) => setLogin(e.target.value)} />

                        <AuthInputField type="password" cldImg={password_image}
                        minLength={8} maxLength={20} placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <span className='auth_medium_text'><Link to={"/forgot-password"}>Забули пароль?</Link></span>

                    <input className='auth_button auth_medium_heading' type='submit' value={"Увійти"}></input>

                    {error && <Error text={error} />}
                </form>

                <span className='auth_medium_text'>Немає аккаунта? <Link to={"/signup"} className='change_auth_link'>Створити</Link></span>
            </div>
        </div>
    );

    async function signin(){
        console.log("signing in");
        try{
            const response = await fetch(`${baseUrl}/user/signin`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });

            await handleResponse(response);
        }
        catch(err){
            console.error(err);
        }
    }
    
    async function handleResponse(response: Response) {
        const data = await response.json();
        if (response.ok) {
            setAccessToken(data.accessToken);
            setError("");
            navigate(from, {replace: true})
        }
        else {
            setError(data.message);
        }
    }
}

export default LoginPage;