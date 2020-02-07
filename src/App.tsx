import React, { useReducer } from 'react';

import { Mode, Theme, Difficult } from './types';
import usePersistedState from './hooks/usePersistedState';
import Game from './components/Game';
import {
    GameContext,
    StateContext,
    DispatchContext,
} from './contexts/GameContext';
import Nav from './components/Nav';

const initialState = {
    theme: Theme.classic,
    mode: Mode.dark,
};

interface IGameProps {
    theme: Theme;
    mode: Mode;
}

const App: React.FC = () => {
    const [game, setGame] = usePersistedState('theme', initialState);
    const setVisual = ({ ...args }) => {
        setGame({ ...game, ...args });
    };

    return (
        <>
            <DispatchContext.Provider value={setVisual}>
                <StateContext.Provider value={game}>
                    <Nav />
                    <Game />
                </StateContext.Provider>
            </DispatchContext.Provider>
        </>
    );
};

export default App;
