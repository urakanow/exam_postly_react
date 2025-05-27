import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import { AdvancedImage } from "@cloudinary/react";

function BannerSlogan() {
    const { cld } = useContext(AuthContext);
    const image = cld.image("banner_image_airpods_jdwkao");

    return (
        <div className="banner_slogan">
            <AdvancedImage cldImg={image} />
            <span>
                Пошук і продаж без зайвого клопоту —<br />
                усе, що потрібно, в одному місці.
            </span>
        </div>
     );
}

export default BannerSlogan;