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
    flat = 'flat',
}
