import { useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';

function Message({ unread }) {
    const { cld } = useContext(AuthContext);
    const profile_picture = cld.image("profile_picture_default_icon_t9kx9b")

    return (
        <div className={`message ${unread && "unread_message"} horizontal_container`} style={{zIndex: 5}}>
            {unread && <div className='unread_marker' />}

            <div className='horizontal_container'>
                <AdvancedImage cldImg={profile_picture} />
                <h3 className='small_heading'>Євгеній</h3>
            </div>

            <span className='small_text'>Активний 3 г. тому</span>
        </div>
    );
}

export default Message;