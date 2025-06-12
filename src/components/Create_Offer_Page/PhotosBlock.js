import Photo from "./Photo";


function PhotosBlock({ photos, setPhotos }) {
    const getFirstEmptyIndex = () => {
        for (let i = 0; i < 8; i++) {
            if (photos[i] === null) return i;
        }
        return null; // All slots are full
    };

    const handlePhotoUpload = (file, index) => {
        const firstEmptyIndex = getFirstEmptyIndex();
        
        if (firstEmptyIndex === null) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            if(index > firstEmptyIndex){
                setPhotos(prev => ({
                    ...prev,
                    [firstEmptyIndex]: e.target.result // Store Data URL
                }));
            }
            else{
                setPhotos(prev => ({
                    ...prev,
                    [index]: e.target.result // Store Data URL
                }));
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="create_offer_page_section">
            <h1 className="section_heading">Фото</h1>

            <label className="text_input_label" htmlFor="photos_container" id="photos_label">Максимально покажіть всі деталі або дефекти, перше фото буде на обкладинці</label>
            <div className="photos_container" id="photos_container">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div className="photos_container_row">
                        {Array.from({ length: 4 }).map((_, j) => (
                            <Photo key={j} onFilesSelect={handlePhotoUpload}
                                photoData={
                                    photos[i * 4 + j] ? 
                                    (photos[i * 4 + j].url ? 
                                        `https://res.cloudinary.com/dxvwnanu4/image/upload/${photos[i * 4 + j].url}?_a=DAJCyJB3ZAA0`
                                        : photos[i * 4 + j])
                                    : null
                                }
                                index={i * 4 + j}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PhotosBlock;