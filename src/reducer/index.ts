import { Cell, Face, ActionType } from '../types';

export interface IState {
    face: Face;
    live: boolean;
    newGame: boolean;
    timer: boolean;
    hasLost: boolean;
    hasWon: boolean;
}

interface IAction {
    type: ActionType;
    payload?: boolean | number | Cell[][] | Face;
}

export const reducer: React.Reducer<IState, IAction> = (
    state,
    action,
): any => {
    switch (action.type) {
        case ActionType.newGame:
            return {
                ...state,
                newGame: true,
                live: false,
                hasLost: false,
                hasWin: false,
                face: Face.smile,
                timer: true,
            };
        case ActionType.hasLost:
            return {
                ...state,
                hasLost: true,
                newGame: false,
                live: false,
                face: Face.lost,
            };
        case ActionType.hasWon:
            return {
                ...state,
                hasWon: true,
                newGame: false,
                live: false,
            };
        case ActionType.live:
            return {
                ...state,
                live: action.payload,
                face: Face.smile,
            };
        case ActionType.face:
            return { ...state, face: action.payload };
        default:
            return state;
    }
};
