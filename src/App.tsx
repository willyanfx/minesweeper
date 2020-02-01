import React, { useState } from 'react';

import { Mode, Theme } from './types';
import { MAX_COLS, MAX_ROWS } from './constants';
import usePersistedState from './hooks/usePersistedState';
import Game from './components/Game';
import ThemeContext from './contexts/theme';
import Dropdown from './components/Dropdown';

const initialState = {
    theme: Theme.classic,
    mode: Mode.dark,
    difficult: 'easy',
};

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState<Mode>(Mode.dark);
    const [theme, setTheme] = usePersistedState(
        'theme',
        initialState,
    );

    const toggle = () => {
        theme.theme === 'classic'
            ? setTheme({ ...theme, theme: Theme.Skeuomorph })
            : setTheme({ ...theme, theme: Theme.classic });
    };
    return (
        <>
            <input type="checkbox" onChange={toggle} />
            <ThemeContext.Provider value={[theme.theme, darkMode]}>
                <Dropdown />
                <Game />
            </ThemeContext.Provider>
        </>
    );
};

export default App;
