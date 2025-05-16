import '../App.css';

function Footer() {
    return (
        <footer>
            <p>Усі онлайн-оголошення України на ШУКАЙКА - тут ви знайдете те, що шукали!<br />
            Натиснувши на кнопку Подати оголошення, ви зможете розмістити оголошення на будь-яку тематику легко й швидко.<br />
            За допомогою сервісу ШУКАЙКА ви зможете купити чи продати з рук у руки практично все, що завгодно.
            </p>

            <div className='footer_social_media'>
                <div className='footer_social_media_text'>
                    <span className='logo' id='footer_logo'>
                        <span id='gradient_part'>ШУКАЙ</span>
                        <span id='green_part'>КА</span>
                    </span>
                    <span> В СОЦ МЕРЕЖАХ</span>
                </div>

                <div className='footer_social_media_images'>
                    <img src='img/tiktok_icon.png' id='tiktok_logo'/>
                    <img src='img/youtube_icon.png' id='youtube_logo'/>
                    <img src='img/instagram_icon.png' id='instagram_logo'/>
                </div>
            </div>

            <div className='faq' >
                <div className='faq_column'>
                    <span>Допомога та зворотній зв'язок</span>
                    <span>Платні послуги</span>
                    <span>Умови користування</span>
                    <span>Політика конфідеційності</span>
                    <span>Реклама на сайті</span>
                </div>

                <div className='faq_column'>
                    <span>Правила безпеки</span>
                    <span>Карта сайту</span>                        
                    <span>Популярні запити</span>
                    <span>Як продавати й купувати</span>
                    <span>Доставка</span>
                </div>
            </div>

            <div className='download_buttons'>
                <img src='img/google_play_icon.png' />
                <img src='img/app_store_icon.png' />
            </div>
        </footer>
    );
}

export default Footer;