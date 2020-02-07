export enum CellValue {
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb,
}
export enum CellState {
    open,
    visible,
    flagged,
}
export type Cell = {
    value: CellValue;
    state: CellState;
    red?: boolean;
};

export enum Face {
    smile = '😁',
    oh = '😮',
    lost = '😵',
    won = '😎',
}

export enum Mode {
    dark = 'dark',
    light = 'light',
}
export enum Theme {
    classic = 'classic',
    Skeuomorph = 'skeuomorph',
}
export enum Difficult {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

export enum ActionType {
    hasWon = 'HAS_WON',
    hasLost = 'HAS_LOST',
    cells = 'CELLS',
    newGame = 'NEWGAME',
    live = 'LIVE',
    face = 'FACE',
}
