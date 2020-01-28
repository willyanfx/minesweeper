import React, { useContext } from 'react';
import './Dropdown.scss';
import ThemeContext from '../../contexts/theme';

function Dropdown() {
    const [theme, mode] = useContext(ThemeContext);

    const classes = [
        `${theme}--dropdown`,
        `${theme}--dropdown-${mode}`,
    ]
        .filter(Boolean)
        .join(' ');
    return <div>Dropss</div>;
}

export default Dropdown;
