import { useRef, useEffect } from 'react';

import { Mode, Theme } from './types';
import usePersistedState from './hooks/usePersistedState';
import Game from './components/Game';
import {
    StateContext,
    DispatchContext,
} from './contexts/GameContext';
import Nav from './components/Nav';
import { backgroundColor } from './utils';

const initialState = {
    theme: Theme.classic,
    mode: Mode.dark,
};

const App: React.FC = () => {
    const [game, setGame] = usePersistedState('theme', initialState);
    const setVisual = ({ ...args }) => {
        setGame({ ...game, ...args });
    };

    const rootRef = useRef<HTMLElement>(null!);

    useEffect(() => {
        if (!rootRef.current) {
            rootRef.current = document.getElementById('root')!;
        }
        rootRef.current.style.background =
            backgroundColor(game) || `grey`;
    }, [game]);

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
