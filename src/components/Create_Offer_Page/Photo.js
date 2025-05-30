import { useRef, useState } from "react";

function Photo({ onFilesSelect, index, photoData }) {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger hidden input
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // console.log(files) // Pass files to parent
            // const reader = new FileReader();
            // reader.onload = (e) => setPreview(e.target.result);
            // reader.readAsDataURL(files[0]);
            onFilesSelect(files[0], index);
        }
    };

    return (
        <div className="add_photo_wrapper">
            <input type="file" className="photo_input" ref={fileInputRef} onChange={handleFileChange}/>   
            {!photoData && <button className="photo" onClick={handleClick}>Додати фото</button>}

            {photoData && <img className="photo" id="photo" onClick={handleClick} src={photoData}/>}
        </div>
     );
}

export default Photo;