import React, { useContext } from 'react';
import './Dropdown.scss';
import GameContext from '../../contexts/GameContext';

function Dropdown() {
    const [theme, mode] = useContext(GameContext);

    const classes = [
        `${theme}--dropdown`,
        `${theme}--dropdown-${mode}`,
    ]
        .filter(Boolean)
        .join(' ');
    return <div>Dropss</div>;
}

export default Dropdown;
