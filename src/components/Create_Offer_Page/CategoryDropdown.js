import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuItem } from './DropdownMenu.tsx';
// import { Menu, MenuItem } from './DropdownMenuSimplified.tsx';
// import { Menu, MenuItem } from "./DropdownMenu";
import { useState } from 'react';

function CategoryDropdown() {
    // const [selected, setSelected] = useState("Select an option");
    // const options = ["Option 1", "Option 2", "Option 3"];

    return (
        // <Dropdown>
        //     <Dropdown.Toggle variant="success" id="dropdown-basic">
        //         Dropdown Button
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu>
        //         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        //         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        //         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        //     </Dropdown.Menu>
        // </Dropdown>

        // <select>
        //     <option id='category_dropdown'>option 1</option>
        //     <option>option 2</option>
        //     <option>option 3</option>
        // </select>
        
        <Menu label="Виберіть категорію" className='dropdown' id='dropdown'>
            <MenuItem label="Меблі" onClick={() => console.log("Undo")} />
            <MenuItem label="Електроніка" />
            <MenuItem label="Мода" />
            <MenuItem label="Робота" />
            <MenuItem label="Іграшки" />
            <MenuItem label="Авто" />
            <MenuItem label="Тварини" />
            <MenuItem label="Нерухомість" id='last_menu_item'/>
        </Menu>

        
        // <Dropdown options={options} selected={selected} onSelect={setSelected}/>
     );
}

export default CategoryDropdown;