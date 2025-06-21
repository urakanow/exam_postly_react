import { useContext } from 'react';
import { useAuth } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import Message from './Message';

function MessagesBlock() {
    const { cld } = useAuth();
    const profile_picture = cld.image("profile_picture_default_icon_t9kx9b")

    return (
        <div id="messages" className="green_rectangle vertical_container">
            <h1 className="semi_large_heading">Повідомлення</h1>
            <Message unread/>

            <Message unread/>

            <Message />

            <Message />

            <Message />
        </div>
     );
}

export default MessagesBlock;