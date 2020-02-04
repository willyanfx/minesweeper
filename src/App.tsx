import React, { useState } from 'react';

import { Mode, Theme, Difficult } from './types';
import { MAX_COLS, MAX_ROWS } from './constants';
import usePersistedState from './hooks/usePersistedState';
import Game from './components/Game';
import GameContext from './contexts/GameContext';
import Dropdown from './components/Dropdown';
import { difficultLevel } from './utils';

const initialState = {
    theme: Theme.classic,
    mode: Mode.dark,
    difficult: Difficult.easy,
};

interface IGameProps {
    theme: Theme;
    mode: Mode;
    difficult: Difficult;
}

const App: React.FC = () => {
    const [game, setGame] = usePersistedState<IGameProps>(
        'theme',
        initialState,
    );

    const toggle = () => {
        game.theme === 'classic'
            ? setGame({ ...game, theme: Theme.Skeuomorph })
            : setGame({ ...game, theme: Theme.classic });
    };

    return (
        <>
            <div
                className={`${game.mode.includes(Mode.dark) &&
                    'background-black'}`}
            />
            <div
                className={`${game.mode.includes(Mode.dark) &&
                    'night'} sun-moon`}
                onClick={() =>
                    game.mode === 'dark'
                        ? setGame({ ...game, mode: Mode.light })
                        : setGame({ ...game, mode: Mode.dark })
                }
            />
            <input type="checkbox" onChange={toggle} />
            <GameContext.Provider value={[game.theme, game.mode]}>
                <Dropdown />
                <Game />
            </GameContext.Provider>
        </>
    );
};

export default App;
