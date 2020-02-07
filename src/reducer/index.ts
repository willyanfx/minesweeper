import { Cell, Face, ActionType } from '../types';

export interface IState {
    cells: Cell[][];
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
        case ActionType.cells:
            return { ...state, cells: action.payload, timer: false };
        case ActionType.newGame:
            return {
                ...state,
                cells: action.payload,
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
                cells: action.payload,
                live: false,
                face: Face.lost,
            };
        case ActionType.hasWon:
            return {
                ...state,
                cells: action.payload,
                hasWon: true,
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
