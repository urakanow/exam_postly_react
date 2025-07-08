import { useState } from 'react';
import { useAuth } from '../../Shared/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router';
import './style.css';
import Error from "../../Shared/Error/Error";
import AuthInputField from './AuthInputField';
import AuthPage from './AuthPage';

function SignUpPage() {
    const { cld } = useAuth();
    const login_image = cld.image("login_icon_h5yruj")
    const email_image = cld.image("restore_password_icon_qdzoys")
    const phone_image = cld.image("phone_number_icon_lnxjlg")
    const password_image = cld.image("password_icon_vilhyw")

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl } = useAuth();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(false);


    return (
        <AuthPage title='Реєстрація'>
            {!isRegistered ? (
                <>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signup();
                    }}>
                        <div className='auth_input_container vertical_container'>
                            <AuthInputField type="text" cldImg={login_image}
                            minLength={3} maxLength={20} placeholder="Логін"
                            onChange={(e) => setUsername(e.target.value)} />

                            <AuthInputField type="email" cldImg={email_image} placeholder="Ел. пошта"
                            onChange={(e) => setEmail(e.target.value)} />

                            <AuthInputField type="tel" cldImg={phone_image} placeholder="Номер тел."
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern="^(\+38|38)?\s?(0\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$"
                            />

                            <AuthInputField type="password" cldImg={password_image}
                            minLength={8} maxLength={20} placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <input type='submit' className='auth_button auth_medium_heading' value={"Створити"} />

                        {error && <Error text={error} />}
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
        </AuthPage>
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

    async function handleResponse(response: Response) {
        if (response.ok) {
            setError("");
            setIsRegistered(true);
        }
        else if(response.status === 409){
            const data = await response.json();
            setError(data.message)
        }
        else {
            setError("Unexpected error. please try again later");
        }
    }
}

export default SignUpPage;