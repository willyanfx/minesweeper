import { createContext } from 'react';
import { Mode, Theme } from '../types';
export interface IGameContextProps {
    theme: Theme;
    mode: Mode;
}

const GameContext = createContext<any>([]);
const StateContext = createContext<any>({});
const DispatchContext = createContext<any>({});

export { GameContext, StateContext, DispatchContext };
