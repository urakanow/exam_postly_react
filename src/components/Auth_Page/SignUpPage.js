import { use, useContext, useState } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link, useLocation, useNavigate } from 'react-router';

function SignUpPage() {
    const { cld } = useContext(AuthContext);
    const login_image = cld.image("login_icon_h5yruj")
    const email_image = cld.image("restore_password_icon_qdzoys")
    const phone_image = cld.image("phone_number_icon_lnxjlg")
    const password_image = cld.image("password_icon_vilhyw")


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl, setAccessToken } = useContext(AuthContext);
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const [isRegistered, setIsRegistered] = useState(false);


    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Реєстрація</h1>

                {!isRegistered ? (
                    <>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            signup();
                        }}>
                            <div className='auth_input_container vertical_container'>
                                <div className="auth_input_wrapper horizontal_container">
                                    <div className="auth_input_image_wrapper vertical_container">
                                        <AdvancedImage cldImg={login_image} />
                                    </div>
                                    <input name='username' type="text" required minLength={3} maxLength={20} className="text_input auth_input auth_medium_heading" placeholder="Логін" onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                <div className='auth_input_container vertical_container'>
                                    <div className="auth_input_wrapper horizontal_container">
                                        <div className="auth_input_image_wrapper vertical_container">
                                            <AdvancedImage cldImg={email_image} />
                                        </div>
                                        <input type="email" required className="text_input auth_input auth_medium_heading" placeholder="Ел. пошта" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="auth_input_wrapper horizontal_container">
                                    <div className="auth_input_image_wrapper vertical_container">
                                        <AdvancedImage cldImg={phone_image} />
                                    </div>
                                    <input type="tel" pattern="^(\+38|38)?\s?(0\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$" title="+380 123 456 789" required className="text_input auth_input auth_medium_heading" placeholder="Номер тел." onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <div className="auth_input_wrapper horizontal_container">
                                    <div className="auth_input_image_wrapper vertical_container">
                                        <AdvancedImage cldImg={password_image} />
                                    </div>
                                    <input type="password" required minLength={8} maxLength={20} className="text_input auth_input auth_medium_heading" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <input type='submit' className='auth_button auth_medium_heading' value={"Створити"} />

                            {error && <span className="small_text error_text">{error}</span>}
                        </form>

                        <span className='auth_medium_text'>Вже є аккаунт? <Link to={"/login"} className='change_auth_link'>Увійти</Link></span>
                    </>
                ) : (
                    <>
                        <span className='auth_medium_text'>
                            На вашу електронну пошту було надіслано лист.<br />
                            Слідуйте наведеним там інструкціям<br />
                            для верифікації електронної адреси
                        </span>

                        <button className='auth_button auth_medium_heading' onClick={() => navigate("/login")}>Назад до входу</button>
                    </>
                )}
            </div>
        </div>
    );

    async function signup() {
        const response = await fetch(`${baseUrl}/user/signup`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({ username, email, phoneNumber, password }),
            credentials: "include"
        });

        await handleResponse(response);
    }

    async function handleResponse(response) {
        // const data = await response.json();
        if (response.ok) {
            // setAccessToken(data.accessToken);
            setError("");
            setIsRegistered(true);
            // navigate(from, {replace: true})
        }
        else {
            setError("Unexpected error. please try again later");
        }
    }
}

export default SignUpPage;