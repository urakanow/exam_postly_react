import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuItem } from './DropdownMenu.tsx';
import { useState, useEffect } from 'react';

function CategoryDropdown({ onChange }) {
    const [selected, setSelected] = useState(null);
    const options = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];

    const handleSelect = (option, index) => {
        console.log("Selected option:", option);
        setSelected(option);
        onChange(index);
    };
    useEffect(() => {
        const dropdownButton = document.querySelector('.RootMenu');
        if (dropdownButton) {
            if (selected === null) {
            dropdownButton.dataset.state = 'placeholder';
            } else {
            dropdownButton.dataset.state = 'selected';
            }
        }
    }, [selected]);

    return (        
        <Menu label={selected == null ? "Виберіть категорію" : selected} className={`dropdown ${!selected ? 'dropdown_placeholder' : 'dropdown_selected'}`} id='dropdown'>
            {options.map((option, index) => 
                <MenuItem label={option} key={index} onClick={() => handleSelect(option, index)}/>
            )}
        </Menu>
     );
}

export default CategoryDropdown;