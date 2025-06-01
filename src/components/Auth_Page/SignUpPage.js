import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router';

function SignUpPage() {
    const { cld } = useContext(AuthContext);
    const login_image = cld.image("login_icon_h5yruj")
    const phone_image = cld.image("phone_number_icon_lnxjlg")
    const password_image = cld.image("password_icon_vilhyw")

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Реєстрація</h1>

                <div className='auth_input_container vertical_container'>
                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={login_image} />
                        </div>
                        <input type="text" className="text_input auth_input auth_medium_heading" placeholder="Логін" />
                    </div>

                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={phone_image} />
                        </div>
                        <input type="text" className="text_input auth_input auth_medium_heading" placeholder="Номер тел." />
                    </div>

                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={password_image} />
                        </div>
                        <input type="password" className="text_input auth_input auth_medium_heading" placeholder="Пароль" />
                    </div>
                </div>

                <button className='auth_button auth_medium_heading'>Створити</button>

                <span className='auth_medium_text'>Вже є аккаунт? <Link to={"/login"} className='change_auth_link'>Увійти</Link></span>
            </div>
        </div>
    );
}

export default SignUpPage;