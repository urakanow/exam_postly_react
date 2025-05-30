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
                <div className="photos_container_row">
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[0]} index={0}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[1]} index={1}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[2]} index={2}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[3]} index={3}/>
                </div>

                <div className="photos_container_row">
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[4]} index={4}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[5]} index={5}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[6]} index={6}/>
                    <Photo onFilesSelect={handlePhotoUpload} photoData={photos[7]} index={7}/>
                </div>
            </div>
        </div>
    );
}

export default PhotosBlock;