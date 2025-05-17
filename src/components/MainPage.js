function MainPage() {
    return (
        <>
            <div className='top_slogan'>
                <span>
                    Купуй вигідно, продавай зручно<br />
                    — тут зустрічаються можливості
                </span>

                <img src="img/top_slogan_image.png"/>
            </div>

            <div className="categories_stripe">
                <div className="category_preview">
                    <img src="img/furniture_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Меблі</span>
                </div>

                <div className="category_preview">
                    <img src="img/electronics_icon.png"/>
                    <div className="category_preview_separator" />
                    <span id="electronics">Електроніка</span>
                </div>

                <div className="category_preview">
                    <img src="img/fashion_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Мода</span>
                </div>

                <div className="category_preview">
                    <img src="img/work_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Робота</span>
                </div>

                <div className="category_preview">
                    <img src="img/toys_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Іграшки</span>
                </div>

                <div className="category_preview">
                    <img src="img/car_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Авто</span>
                </div>

                <div className="category_preview">
                    <img src="img/pets_icon.png"/>
                    <div className="category_preview_separator" />
                    <span>Тварини</span>
                </div>

                <div className="category_preview">
                    <img src="img/real_estate_icon.png"/>
                    <div className="category_preview_separator" />
                    <span id="real_estate">Нерухомість</span>
                </div>
            </div>
        </>
     );
}

export default MainPage;