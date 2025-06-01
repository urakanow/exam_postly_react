import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router';

function LoginPage() {
    const { cld } = useContext(AuthContext);
    const login_image = cld.image("login_icon_h5yruj")
    const password_image = cld.image("password_icon_vilhyw")

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Вхід</h1>

                <div className='auth_input_container vertical_container'>
                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={login_image} />
                        </div>
                        <input type="text" class="text_input auth_input auth_medium_heading" placeholder="Логін" />
                    </div>

                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={password_image} />
                        </div>
                        <input type="password" class="text_input auth_input auth_medium_heading" placeholder="Пароль" />
                    </div>
                </div>

                <span className='auth_medium_text'><Link to={"/restore-password"}>Забули пароль?</Link></span>

                <button className='auth_button auth_medium_heading'>Увійти</button>

                <span className='auth_medium_text'>Немає аккаунта? <Link to={"/signup"} className='change_auth_link'>Створити</Link></span>
            </div>
        </div>
    );
}

export default LoginPage;