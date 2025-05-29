import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function PersonalPage() {
    const { cld } = useContext(AuthContext);
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p");
    const profile_picture = cld.image("profile_picture_default_icon_t9kx9b")

    return (
        <div id="personal_page_wrapper" className="horizontal_container">
            <div id="personal_data" className="green_rectangle vertical_container">
                <h1 className="semi_large_heading">Особистий Кабінет</h1>

                <label className="text_input_label" htmlFor="name">Ім’я</label>
                <input type="text" className="text_input" id="name" value={"Олег"}/>

                <label className="text_input_label" htmlFor="name">Прізвище</label>
                <input type="text" className="text_input" id="name" value={"Буловинов"}/>

                <label className="text_input_label" htmlFor="name">Місто</label>
                <input type="text" className="text_input" id="name" value={"Київ"}/>

                <label className="text_input_label" htmlFor="name">Поштовий індекс</label>
                <input type="text" className="text_input" id="name" value={"02000"}/>

                <label className="text_input_label" htmlFor="name">Адреса</label>
                <input type="text" className="text_input" id="name" value={"7-5, Несторівський провулок"}/>

                <label className="text_input_label" htmlFor="name">Номер квартири</label>
                <input type="text" className="text_input" id="name" value={"14"}/>

                <label className="text_input_label" htmlFor="name">Ел. Адреса</label>
                <input type="text" className="text_input" id="name" value={"3366bulka@gmail.com"}/>

                <label className="text_input_label" htmlFor="name">Номер телефону</label>
                <input type="text" className="text_input" id="name" value={"+3800668735489"}/>

                <button className="green_button" id="save_button">Зберегти</button>
            </div>

            <div id='personal_page_right_section' className="vertical_container">
                <div id="my_offers" className="green_rectangle vertical_container">
                    <h1 className="semi_large_heading">Мої оголошення</h1>

                    <div className="carouselle horizontal_container">
                        <div className="horizontal_container">
                            <div className="my_offer_preview">
                                <div className="image_wrapper">
                                    <img className="offer_preview_image" src="default_image.jpg" />
                                </div>
                                <h1>Осел пихає</h1>
                                <span>420 420 грн.</span>
                                <span>Активно</span>
                            </div>

                            <div className="my_offer_preview">
                                <div className="image_wrapper">
                                    <img className="offer_preview_image" src="default_image.jpg" />
                                </div>
                                <h1>Осел пихає</h1>
                                <span>420 420 грн.</span>
                                <span>Активно</span>
                            </div>

                            <div className="my_offer_preview">
                                <div className="image_wrapper">
                                    <img className="offer_preview_image" src="default_image.jpg" />
                                </div>
                                <h1>Осел пихає</h1>
                                <span>420 420 грн.</span>
                                <span>Активно</span>
                            </div>
                        </div>

                        <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
                    </div>
                </div>

                <div id="messages" className="green_rectangle vertical_container">
                    <h1 className="semi_large_heading">Повідомлення</h1>

                    <div className='message unread_message horizontal_container' style={{zIndex: 5}}>
                        <div className='unread_marker' />

                        <div className='horizontal_container'>
                            <AdvancedImage cldImg={profile_picture} />
                            <h3 className='small_heading'>Євгеній</h3>
                        </div>

                        <span className='small_text'>Активний 3 г. тому</span>
                    </div>

                    <div className='message unread_message horizontal_container' style={{zIndex: 4}}>
                        <div className='unread_marker' />

                        <div className='horizontal_container'>
                            <AdvancedImage cldImg={profile_picture} />
                            <h3 className='small_heading'>Марина</h3>
                        </div>

                        <span className='small_text'>Активний 15 хв. тому</span>
                    </div>

                    <div className='message horizontal_container' style={{zIndex: 3}}>
                        <div className='horizontal_container'>
                            <AdvancedImage cldImg={profile_picture} />
                            <h3 className='small_heading'>Pet_tale335</h3>
                        </div>

                        <span className='small_text'>Активний 3 д. тому</span>
                    </div>

                    <div className='message horizontal_container' style={{zIndex: 2}}>
                        <div className='horizontal_container'>
                            <AdvancedImage cldImg={profile_picture} />
                            <h3 className='small_heading'>Andrii</h3>
                        </div>

                        <span className='small_text'>Активний зараз</span>
                    </div>

                    <div className='message horizontal_container' style={{zIndex: 1}}>
                        <div className='horizontal_container'>
                            <AdvancedImage cldImg={profile_picture} />
                            <h3 className='small_heading'>Олена</h3>
                        </div>

                        <span className='small_text'>Активний 15 г. тому</span>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PersonalPage;