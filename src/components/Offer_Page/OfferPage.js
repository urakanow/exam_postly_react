import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function OfferPage() {
    const { id } = useParams();
    const { cld } = useContext(AuthContext);
    const profile_picture = cld.image("profile_picture_default_icon_t9kx9b");
    const green_arrow_image = cld.image("green_arrow_icon_rmvcna");
    const ukrpost_image = cld.image("ukrpost_icon_rxne6a");
    const novapost_image = cld.image("nova_post_icon_coq0n8")
    const offer_test_image = cld.image("e033da6d911d1afa9de7e07933784e7dc5ba243e_govgvc")
    const left_arrow_image = cld.image("left_arrow_icon_xozc74")
    const right_arrow_image = cld.image("right_arrow_icon_m9px0p")
    const location_image = cld.image("location_icon_szvvv8")
    
    return ( 
        <div className='offer_page_container'>
            
            <div className='vertical_container' id='offer_page_left_section'>
                <div className='green_rectangle vertical_container' id='offer_page_photo_section'>
                    <div className='carouselle horizontal_container'>
                        <AdvancedImage cldImg={left_arrow_image} className="carouselle_arrow" id="left_arrow"/>
                        <AdvancedImage cldImg={right_arrow_image} className="carouselle_arrow" id="right_arrow"/>
                        <AdvancedImage cldImg={offer_test_image} className="carouselle_photo"/>
                    </div>

                    <div className='horizontal_container' id='carouselle_indicator_container'>
                        <div className='carouselle_indicator' id='carouselle_indicator_selected'/>
                        <div className='carouselle_indicator'/>
                        <div className='carouselle_indicator'/>
                    </div>
                </div>

                <div className='green_rectangle horizontal_container' id='info_bar'>
                    <div>Приватна особа</div>
                    <div>Стан: Вживане</div>
                    <div>Електроніка</div>
                </div>

                <div className='green_rectangle vertical_container' id='description_display'>
                    <h1 className='medium_heading'>Опис</h1>

                    <p className='small_text' id='description_text'>
                        Ігровий комп'ютер купував 3 місяці тому в ідеальному стані,пломби на місці,коробки все є. У корпусі 6 кулерів. Комп'ютер на гарантії в магазині “Brain”, так само окрема гарантія на всі запчастини.
                        Характеристики:
                        Відеокарта: RTX 4060 ti 8 GB, Gigabyte Aero (біла)
                        Процесор: Ryzen 5 7500f
                        Материнська плата: MB gigabyte B650M DS3H sAM5 ddr5
                        Оперативна пам'ять: Kingston fury 32GB ddr5 (2x16) 5600 MHz
                        Блок живлення: Vinga 650W 80PLUS gold

                    </p>

                    <div className='horizontal_container' id='report_container'>
                        <span className='small_text'>ID: 884570200</span>

                        <button className='green_button small_heading' id='report_button'>Поскаржитися</button>
                    </div>
                </div>

                <div className='green_rectangle horizontal_container' id='location_container'>
                    <AdvancedImage cldImg={location_image} id="location_image" />
                    <span className='small_text'>Місцезнаходження: Дніпро, Дніпропетровська область</span>
                </div>
            </div>
            <div className='green_rectangle vertical_container ' id='offer_page_buy_section'>
                <span className='small_text' id='published_at'>Опубліковано Сьогодні о 13:32</span>

                <h1 className='large_heading' id='offer_page_title'>Ігровий Пк</h1>

                <h2 className='medium_heading'>88 000 грн.</h2>

                <div className='user'>
                    <AdvancedImage cldImg={profile_picture} />
                    <div className='vertical_container' id='user_info'>
                        <h2 className='medium_heading'>User</h2>
                        <span className='small_text'>+380 99 453 21 87</span>
                    </div>
                </div>

                <div className='horizontal_container' id='send_message'>
                    <input type='text' className='text_input' placeholder="Зв'язатися з продавцем"/>
                    <AdvancedImage cldImg={green_arrow_image} id="form_text_input_image"/>
                </div>

                <button className='green_button' id='buy_now_button'>Купити зараз</button>

                <h3 className='small_heading'>Спосіб доставки</h3>
                
                <div className='delivery horizontal_container'>
                    <div className='vertical_container'>
                        <h3 className='small_heading'>Укрпошта</h3>
                        <span className='small_text'>
                            безкоштовно, доставка<br />
                            протягом 2-5 днів
                        </span>
                    </div>
                    <AdvancedImage cldImg={ukrpost_image} />
                </div>

                <div className='delivery horizontal_container'>
                    <div className='vertical_container'>
                        <h3 className='small_heading'>У відділення Нова пошта</h3>
                        <span className='small_text'>
                            від 60 грн, доставка<br />
                            протягом 1-3 днів
                        </span>
                    </div>
                    <AdvancedImage cldImg={novapost_image} />
                </div>

                <div className='delivery horizontal_container'>
                    <div className='vertical_container'>
                        <h3 className='small_heading'>Кур'єром Нова пошта</h3>
                        <span className='small_text'>
                            від 95 грн, доставка<br />
                            протягом 1-3 днів
                        </span>
                    </div>
                    <AdvancedImage cldImg={novapost_image} />
                </div>

                <div className='delivery horizontal_container'>
                    <div className='vertical_container'>
                        <h3 className='small_heading'>Нова Пошта у Польщу</h3>
                        <span className='small_text'>
                            від 350 грн, доставка<br />
                            протягом 2-5 днів
                        </span>
                    </div>
                    <AdvancedImage cldImg={novapost_image} />
                </div>

            </div>
        </div>
    );
}

export default OfferPage;