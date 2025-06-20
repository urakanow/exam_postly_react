import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { useAuth } from "../Shared/AuthContext";

function Slogan() {
    const { cld } = useAuth(); 
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