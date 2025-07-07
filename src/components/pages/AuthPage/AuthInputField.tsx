import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string,
    cldImg: CloudinaryImage,
    minLength?: number,
    maxLength?: number,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function AuthInputField({ type, cldImg, minLength, maxLength, placeholder, onChange, ...inputProps }: AuthInputFieldProps) {
    return (
        <div className="auth_input_wrapper horizontal_container">
            <div className="auth_input_image_wrapper vertical_container">
                <AdvancedImage cldImg={cldImg} />
            </div>
            
            <input className="text_input auth_input auth_medium_heading"
            type={type} required
            minLength={minLength} maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            {...inputProps}
            />
        </div>
    );
}

export default AuthInputField;