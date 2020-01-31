import React, { useState } from 'react';

import { Mode, Theme } from './types';
import { MAX_COLS, MAX_ROWS } from './constants';

import Game from './components/Game';
import ThemeContext from './contexts/theme';
import Dropdown from './components/Dropdown';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState<Mode>(Mode.light);
    const [theme, setTheme] = useState<Theme>(Theme.classic);

    return (
        <ThemeContext.Provider value={[theme, darkMode]}>
            <Dropdown />
            <Game />
        </ThemeContext.Provider>
    );
};

export default App;
