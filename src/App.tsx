import React from 'react';

import { Mode, Theme, Difficult } from './types';
import usePersistedState from './hooks/usePersistedState';
import Game from './components/Game';
import GameContext from './contexts/GameContext';

const initialState = {
    theme: Theme.classic,
    mode: Mode.dark,
};

interface IGameProps {
    theme: Theme;
    mode: Mode;
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
    const darkmode = () =>
        game.mode === 'dark'
            ? setGame({ ...game, mode: Mode.light })
            : setGame({ ...game, mode: Mode.dark });

    return (
        <>
            <nav className={`nav nav-${game.mode}`}>
                <img src="" alt="logo" />

                <div className="nav--items">
                    <button role="switch" onClick={toggle}>
                        {game.theme}
                    </button>
                    <div
                        className={`${game.mode.includes(Mode.dark) &&
                            'night'} sun-moon`}
                        onClick={darkmode}
                    />
                </div>
            </nav>
            <GameContext.Provider value={[game.theme, game.mode]}>
                <Game />
            </GameContext.Provider>
        </>
    );
};

export default App;
