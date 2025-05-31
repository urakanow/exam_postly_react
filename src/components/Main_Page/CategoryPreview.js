import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import { AdvancedImage } from "@cloudinary/react";

function CategoryPreview({ imgUrl, categoryName, id=""}) {
    const { cld } = useContext(AuthContext);
    const image = cld.image(imgUrl)

    return (
        <div className="category_preview">
            {/* <img src={imgUrl}/> */}
            <AdvancedImage cldImg={image} />
            <div className="category_preview_separator" />
            <span id={id || undefined}>{categoryName}</span>
        </div>
     );
}

export default CategoryPreview;