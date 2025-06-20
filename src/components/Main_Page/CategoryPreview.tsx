import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { useAuth } from "../Shared/AuthContext";

interface CategoryPreviewProps {
    imgUrl: string,
    categoryName: string,
    styleId?: string | null
}

function CategoryPreview({ imgUrl, categoryName, styleId = null }: CategoryPreviewProps) {
    const { cld } = useAuth();
    const image = cld.image(imgUrl)

    return (
        <div className="category_preview">
            {/* <img src={imgUrl}/> */}
            <AdvancedImage cldImg={image} />
            <div className="category_preview_separator" />
            <span id={styleId || undefined}>{categoryName}</span>
        </div>
     );
}

export default CategoryPreview;