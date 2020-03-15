import React, { useContext, useEffect } from 'react';
import './Nav.scss';
import { Mode, Theme, Difficult } from '../../types';

import {
    StateContext,
    DispatchContext,
} from '../../contexts/GameContext';
import { Logo } from '../assets/Logo';

export default function Nav() {
    const game = useContext(StateContext);
    const [darkMode, setDarkMode] = React.useState(game.mode === 'dark' ? false : true);
    const [theme, setTheme] = React.useState(game.theme);
    const setVisual = useContext(DispatchContext);



    function toggleDark() {
        darkMode === false
            ? setDarkMode(true)
            : setDarkMode(false)
        const mode = darkMode ? Mode.dark : Mode.light;
        setVisual({ mode });
    }

    useEffect(() => {
        setVisual({ theme });
    }, [theme]);



    const classes = ['nav',
        `nav-${game.theme}-${game.mode}`
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <header className={classes}>
            <div className="logo">
                <Logo />
            </div>
            <div className="options">
                <button
                    onClick={() =>
                        theme === Theme.classic
                            ? setTheme(Theme.Skeuomorph)
                            : setTheme(Theme.classic)
                    }
                >
                    {theme}
                </button>
                <div
                    id="toggle"
                    onClick={toggleDark}
                >
                    <div
                        className={`${darkMode &&
                            'toggle-active'} toggle-inner`}
                    />
                </div>
            </div>
        </header>
    );
}
