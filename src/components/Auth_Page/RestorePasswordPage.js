import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router';

function RestorePasswordPage() {
    const { cld } = useContext(AuthContext);
    const restore_password_image = cld.image("restore_password_icon_qdzoys")

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Відновлення пароля</h1>

                <span className='auth_medium_text'>
                    Вам буде надіслано інструкцію<br/>
                    з відновлення пароля
                </span>

                <div id='restore_password_input_container' className='auth_input_container vertical_container'>
                    <div className="auth_input_wrapper horizontal_container">
                        <div className="auth_input_image_wrapper vertical_container">
                            <AdvancedImage cldImg={restore_password_image} />
                        </div>
                        <input type="text" class="text_input auth_input auth_medium_heading" placeholder="Ел. пошта" />
                    </div>
                </div>

                <button className='auth_button auth_medium_heading'>Надіслати інструкцію</button>

                <span className='auth_medium_text'><Link to={"/login"}>Назад до входу</Link></span>
            </div>
        </div>
    );
}

export default RestorePasswordPage;