import React, { useContext, useEffect } from 'react';
import './Nav.scss';
import { Mode, Theme, Difficult } from '../../types';

import {
    StateContext,
    DispatchContext,
} from '../../contexts/GameContext';

export default function Nav() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [theme, setTheme] = React.useState(Theme.Skeuomorph);
    const game = useContext(StateContext);
    const setVisual = useContext(DispatchContext);

    useEffect(() => {
        const mode = darkMode ? Mode.dark : Mode.light;
        setVisual({ mode });
    }, [darkMode]);

    useEffect(() => {
        setVisual({ theme });
    }, [theme]);

    const classes = [darkMode ? 'dark-mode' : null, 'nav']
        .filter(Boolean)
        .join(' ');

    return (
        <header className={classes}>
            <div className="logo">LOGO</div>
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
                    onClick={() =>
                        darkMode === false
                            ? setDarkMode(true)
                            : setDarkMode(false)
                    }
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
