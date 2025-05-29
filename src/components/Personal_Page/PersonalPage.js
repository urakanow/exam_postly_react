import PersonalDataBlock from './PersonalDataBlock';
import MyOffersBlock from './MyOffersBlock';
import MessagesBlock from './MessagesBlock';

function PersonalPage() {
    return (
        <div id="personal_page_wrapper" className="horizontal_container">
            <PersonalDataBlock />

            <div id='personal_page_right_section' className="vertical_container">
                <MyOffersBlock />

                <MessagesBlock />
            </div>
        </div>
     );
}

export default PersonalPage;