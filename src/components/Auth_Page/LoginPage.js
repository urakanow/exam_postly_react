import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link, useLocation, useNavigate } from 'react-router';

function LoginPage() {
    const { cld } = useContext(AuthContext);
    const login_image = cld.image("login_icon_h5yruj")
    const password_image = cld.image("password_icon_vilhyw")
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl, setAccessToken } = useContext(AuthContext);
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
                        <div className="auth_input_wrapper horizontal_container">
                            <div className="auth_input_image_wrapper vertical_container">
                                <AdvancedImage cldImg={login_image} />
                            </div>
                            <input type="text" required minLength={3} maxLength={20} className="text_input auth_input auth_medium_heading" placeholder="Логін" onChange={(e) => setLogin(e.target.value)} />
                        </div>

                        <div className="auth_input_wrapper horizontal_container">
                            <div className="auth_input_image_wrapper vertical_container">
                                <AdvancedImage cldImg={password_image} />
                            </div>
                            <input type="password" required minLength={8} maxLength={20} className="text_input auth_input auth_medium_heading" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <span className='auth_medium_text'><Link to={"/restore-password"}>Забули пароль?</Link></span>

                    <input className='auth_button auth_medium_heading' type='submit' value={"Увійти"}></input>

                    {error && <span className="small_text error_text">{error}</span>}
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

    async function handleResponse(response) {
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