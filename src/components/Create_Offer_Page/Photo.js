import { useRef, useState } from "react";

function Photo() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger hidden input
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // console.log(files) // Pass files to parent
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <>
            <input type="file" className="photo_input" ref={fileInputRef} onChange={handleFileChange}/>   
            {!preview && <button className="photo" onClick={handleClick}>Додати фото</button>}

            {preview && <img className="photo" id="photo" onClick={handleClick} src={preview}/>}
        </>
     );
}

export default Photo;