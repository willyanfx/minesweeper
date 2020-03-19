import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
} from 'react';
import { StateContext } from '../../contexts/GameContext';
import { reducer, IState } from '../../reducer';
import Cells from '../Cells';
import { NumberDisplay, TimerDisplay } from '../NumberDisplay';
import { generateCells, openMultipleCells } from '../../utils';
import {
    Cell,
    CellState,
    CellValue,
    Face,
    ActionType,
} from '../../types';
import { MAX_COLS, MAX_ROWS } from '../../constants';
import './Game.scss';

interface IAction {
    type: ActionType;
    payload?: boolean | number | Cell[][] | Face;
}

const initialState: IState = {
    live: false,
    newGame: true,
    hasWon: false,
    hasLost: false,
    face: Face.smile,
    timer: false,
};

const Game: React.FC = () => {
    const [bombCounter, setBombCounter] = useState<number>(10);
    const [cells, setCells] = useState<Cell[][]>(generateCells());
    const { theme, mode } = useContext(StateContext);

    const [state, dispatch] = useReducer<
        React.Reducer<IState, IAction>
    >(reducer, initialState);

    const handleCellClick = (
        rowParam: number,
        colParam: number,
    ) => (): void => {
        let newCells = cells.slice();
        if (!state.live) {
            let isABomb =
                newCells[rowParam][colParam].value === CellValue.bomb;
            while (isABomb) {
                newCells = generateCells();
                if (
                    newCells[rowParam][colParam].value !==
                    CellValue.bomb
                ) {
                    isABomb = false;
                    break;
                }
            }
            dispatch({ type: ActionType.live, payload: true });
        }

        const currentCell = newCells[rowParam][colParam];

        if (
            [CellState.flagged, CellState.visible].includes(
                currentCell.state,
            )
        ) {
            return;
        }

        if (currentCell.value === CellValue.bomb) {
            newCells[rowParam][colParam].red = true;
            newCells = showAllBombs();

            setCells(newCells)
            dispatch({ type: ActionType.hasLost });
            return;
        } else if (currentCell.value === CellValue.none) {
            newCells = openMultipleCells(
                newCells,
                rowParam,
                colParam,
            );
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
        }

        // Check to see if you have won
        let safeOpenCellsExists = false;
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLS; col++) {
                const currentCell = newCells[row][col];

                if (
                    currentCell.value !== CellValue.bomb &&
                    currentCell.state === CellState.open
                ) {
                    safeOpenCellsExists = true;
                    break;
                }
            }
        }

        if (!safeOpenCellsExists) {
            newCells = newCells.map(row =>
                row.map(cell => {
                    if (cell.value === CellValue.bomb) {
                        return {
                            ...cell,
                            state: CellState.flagged,
                        };
                    }
                    return cell;
                }),
            );
            dispatch({ type: ActionType.hasWon });
        }


        setCells(newCells)

    };

    const handleCellContext = (
        rowParam: number,
        colParam: number,
    ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (state.hasLost || state.hasWon) return;

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if (currentCell.state === CellState.visible) {
            return;
        } else if (currentCell.state === CellState.open) {
            currentCells[rowParam][colParam].state =
                CellState.flagged;

            setCells(currentCells)
            setBombCounter(bombCounter - 1);
        } else if (currentCell.state === CellState.flagged) {
            currentCells[rowParam][colParam].state = CellState.open;

            setCells(currentCells)
            dispatch({
                type: ActionType.cells,
            });
            setBombCounter(bombCounter + 1);
        }
    };

    const handleFaceClick = (): void => {
        setCells(generateCells())
        dispatch({
            type: ActionType.newGame
        });
    };

    // handle mouse event
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => dispatch({ type: ActionType.face, payload: Face.oh });

    const handleMouseUp = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => dispatch({ type: ActionType.face, payload: Face.smile });

    const showAllBombs = (): Cell[][] => {
        const currentCells = cells.slice();
        return currentCells.map(row =>
            row.map(cell => {
                if (cell.value === CellValue.bomb) {
                    return {
                        ...cell,
                        state: CellState.visible,
                    };
                }

                return cell;
            }),
        );
    };

    return (
        <>
            <div className="result">
                {state.hasWon && (<h1>Congrats <span>🎉</span></h1>)}
                {state.hasLost && (<h1>Game Over <span>😭</span></h1>)}
            </div>
            <div className={`game ${theme} ${theme}-${mode}`}>
                <div
                    className={`${theme}--header ${theme}--header-${mode}`}
                >
                    <NumberDisplay value={bombCounter} />
                    <button
                        className={`${theme}--face ${theme}--face-${mode}`}
                        aria-label="start/reset"
                        onClick={handleFaceClick}
                    >
                        <span role="img">{state.face}</span>
                    </button>
                    <TimerDisplay live={state.live} timer={state.timer} />
                </div>
                <div className={`${theme}--body ${theme}--body-${mode}`}>
                    <Cells
                        disabled={state.hasLost}
                        state={cells}
                        onClick={
                            state.hasLost || state.hasWon
                                ? () => { }
                                : handleCellClick
                        }
                        onContext={handleCellContext}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                </div>
            </div>
        </>
    );
};

export default Game;
