import React, { Context } from 'react';
import { Mode, Theme } from '../types';
export interface IGameContextProps {
    theme: Theme;
    mode: Mode;
    difficult?: string;
}

const GameContext = React.createContext<any>([]);

export default GameContext;
