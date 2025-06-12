import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuItem } from './DropdownMenu.tsx';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Shared/AuthContext.js';

function CategoryDropdown({ onChange, selectedIndex = null }) {
    // const options = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];
    const { options } = useContext(AuthContext);
    // const [selected, setSelected] = useState(selectedIndex ? options[selectedIndex] : null);

    const handleSelect = (option, index) => {
        console.log("Selected option:", option);
        // setSelected(option);
        onChange(index);
    };
    useEffect(() => {
        console.log("selected: ", selectedIndex);
        const dropdownButton = document.querySelector('.RootMenu');
        if (dropdownButton) {
            if (selectedIndex === null) {
            dropdownButton.dataset.state = 'placeholder';
            } else {
            dropdownButton.dataset.state = 'selected';
            }
        }
    }, [selectedIndex]);

    return (
        <Menu label={selectedIndex == null ? "Виберіть категорію" : options[selectedIndex]}>
            {options.map((option, index) => 
                <MenuItem label={option} key={index} onClick={() => handleSelect(option, index)}/>
            )}
        </Menu>
     );
}

export default CategoryDropdown;