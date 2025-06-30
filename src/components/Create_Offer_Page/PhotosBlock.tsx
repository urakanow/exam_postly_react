import { Photo } from "../../models/Photo";
import { PhotosType } from "./CreateOfferPage";
import PhotoElement from "./Photo";

interface PhotosBlockProps {
    photos: PhotosType,
    setPhotos: React.Dispatch<React.SetStateAction<PhotosType>>
}

function PhotosBlock({ photos, setPhotos }: PhotosBlockProps) {
    const getFirstEmptyIndex = () => {
        for (let i = 0; i < 8; i++) {
            if (photos != null && photos[i] == null) return i;
        }
        return null; // All slots are full
    };

    const handlePhotoUpload = (file: File, index: number) => {
        const firstEmptyIndex = getFirstEmptyIndex();
        
        if (firstEmptyIndex === null) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
               const result = e.target?.result;
            if (typeof result !== 'string') return; // Skip if not a Data URL

            setPhotos((prev) => {
                const updatedPhotos = { ...prev }; // Safely spread (works even if `prev` is null)
                const targetIndex = index > firstEmptyIndex ? firstEmptyIndex : index;
                updatedPhotos[targetIndex] = result; // Store Data URL
                return updatedPhotos;
            });
        };
        reader.readAsDataURL(file);
    };

    function getPhotoUrl(photo: string | Photo | null): string | null {
        if (photo === null) {
            // Handle null case
            console.log("No photo available");
            return null;
        }
        
        if (typeof photo === 'string') {
            // Handle string case
            console.log("Photo URL:", photo);
            return photo;
        }
        
        if ('url' in photo) {  // TypeScript will know this must be { url: string } here
            console.log("Photo object URL:", photo.url);
            return `https://res.cloudinary.com/dxvwnanu4/image/upload/${photo.url}?_a=DAJCyJB3ZAA0`;
        }
        
        throw new Error("Invalid photo type");
    }

    return (
        <div className="create_offer_page_section">
            <h1 className="section_heading">Фото</h1>

            <label className="text_input_label" htmlFor="photos_container" id="photos_label">Максимально покажіть всі деталі або дефекти, перше фото буде на обкладинці</label>
            <div className="photos_container" id="photos_container">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div className="photos_container_row">
                        {Array.from({ length: 4 }).map((_, j) => (
                            // <Photo key={j} onFilesSelect={handlePhotoUpload}
                            //     photoUrl={
                            //         photos[i * 4 + j] ? 
                            //         (photos[i * 4 + j]?.url ? 
                            //             `https://res.cloudinary.com/dxvwnanu4/image/upload/${photos[i * 4 + j].url}?_a=DAJCyJB3ZAA0`
                            //             : photos[i * 4 + j])
                            //         : null
                            //     }
                            //     index={i * 4 + j}/>
                            <PhotoElement key={j} onFilesSelect={handlePhotoUpload} photoUrl={getPhotoUrl(photos[i * 4 + j])} index={i * 4 + j} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PhotosBlock;