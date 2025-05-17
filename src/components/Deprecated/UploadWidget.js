import { useEffect, useRef } from 'react';


function UploadWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dxvwnanu4',
            uploadPreset: 'ml_default'
        }, function(error, result){
            console.log(result);
        });
    }, []);

    return ( 
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    );
}

export default UploadWidget;