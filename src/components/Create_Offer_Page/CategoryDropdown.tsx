import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuItem } from './DropdownMenu';
import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../Shared/AuthContext';

interface StateDropdownProps {
    onChange: (index: number) => void,
    selectedIndex?: number
}

function CategoryDropdown({ onChange, selectedIndex }: StateDropdownProps) {
    // const options = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];
    const { options } = useAuth();
    // const [selected, setSelected] = useState(selectedIndex ? options[selectedIndex] : null);

    const handleSelect = (option: string, index: number) => {
        console.log("Selected option:", option);
        // setSelected(option);
        onChange(index);
    };
    // useEffect(() => {
    //     console.log("selected: ", selectedIndex);
    //     const dropdownButton = document.querySelector('.RootMenu');
    //     if (dropdownButton) {
    //         if (selectedIndex === null) {
    //         dropdownButton.dataset.state = 'placeholder';
    //         } else {
    //         dropdownButton.dataset.state = 'selected';
    //         }
    //     }
    // }, [selectedIndex]);

    return (
        <Menu label={selectedIndex == null ? "Виберіть категорію" : options[selectedIndex]}>
            {options.map((option, index) => 
                <MenuItem label={option} key={index} onClick={() => handleSelect(option, index)}/>
            )}
        </Menu>
     );
}

export default CategoryDropdown;