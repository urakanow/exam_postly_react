import { Menu, MenuItem } from './DropdownMenu.tsx';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../Shared/AuthContext.js';

function StateDropdown({ onChange }) {
    const dropdownRef = useRef(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selected, setSelected] = useState(null);
    const options = ["Нове", "Вживане", "З дефектом"];
    // const { options } = useContext(AuthContext);

    const handleSelect = (option, index) => {
        // console.log("Selected option:", option);
        setSelected(option);
        setSelectedState(index)
        onChange(index);
    };
    // useEffect(() => {
    //     const dropdownButton = document.querySelector('.RootMenu');
    //     if (dropdownButton) {
    //         if (selected === null) {
    //         dropdownButton.dataset.state = 'placeholder';
    //         } else {
    //         dropdownButton.dataset.state = 'selected';
    //         }
    //     }
    // }, [selected]);

    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.dataset.state = selectedState === null ? 'placeholder' : 'selected';
        }
    }, [selectedState]);

    return (        
        <Menu label={selected == null ? "Виберіть стан" : selected} className={`dropdown ${!selected ? 'dropdown_placeholder' : 'dropdown_selected'}`} id='state_dropdown' ref={dropdownRef}>
            {options.map((option, index) => 
                <MenuItem label={option} key={index} onClick={() => handleSelect(option, index)}/>
            )}
        </Menu>
    );
}

export default StateDropdown;