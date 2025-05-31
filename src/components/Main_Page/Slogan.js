import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import { AdvancedImage } from "@cloudinary/react";

function Slogan() {
    const { cld } = useContext(AuthContext);
    const image = cld.image("top_slogan_image_rebaxd");
    
    return (
        <div className='top_slogan'>
            <span>
                Купуй вигідно, продавай зручно<br />
                — тут зустрічаються можливості
            </span>

            {/* <img src="img/top_slogan_image.png"/> */}
            <AdvancedImage cldImg={image} />
        </div>
     );
}

export default Slogan;