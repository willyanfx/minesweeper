import React, { useEffect, useState } from 'react';

import Button from '../Button';
import NumberDisplay from '../NumberDisplay';
import { generateCells, openMultipleCells } from '../../utils';
import { Cell, CellState, CellValue, Face } from '../../types';
import { MAX_COLS, MAX_ROWS } from '../../constants';

import './App.scss';

const App: React.FC = () => {
    const [cells, setCells] = useState<Cell[][]>(generateCells());
    const [face, setFace] = useState<Face>(Face.smile);
    const [live, setLive] = useState<boolean>(false);
    const [bombCounter, setBombCounter] = useState<number>(10);
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [hasWon, setHasWon] = useState<boolean>(false);

    useEffect(() => {
        if (hasLost) {
            setLive(false);
            setFace(Face.lost);
        }
    }, [hasLost]);

    useEffect(() => {
        if (hasWon) {
            setLive(false);
            setFace(Face.won);
        }
    }, [hasWon]);

    const handleCellClick = (
        rowParam: number,
        colParam: number,
    ) => (): void => {
        let newCells = cells.slice();

        // start the game
        if (!live) {
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
            setLive(true);
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
            setHasLost(true);
            newCells[rowParam][colParam].red = true;
            newCells = showAllBombs();
            setCells(newCells);
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
            setHasWon(true);
        }

        setCells(newCells);
    };

    const handleCellContext = (
        rowParam: number,
        colParam: number,
    ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (!live) {
            return;
        }

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if (currentCell.state === CellState.visible) {
            return;
        } else if (currentCell.state === CellState.open) {
            currentCells[rowParam][colParam].state =
                CellState.flagged;
            setCells(currentCells);
            setBombCounter(bombCounter - 1);
        } else if (currentCell.state === CellState.flagged) {
            currentCells[rowParam][colParam].state = CellState.open;
            setCells(currentCells);
            setBombCounter(bombCounter + 1);
        }
    };

    const handleFaceClick = (): void => {
        setLive(false);
        setCells(generateCells());
        setHasLost(false);
        setHasWon(false);
    };

    // handle mouse event
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        setFace(Face.oh);
    };
    const handleMouseUp = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        setFace(Face.smile);
    };

    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
                <Button
                    col={colIndex}
                    key={`${rowIndex}-${colIndex}`}
                    onClick={handleCellClick}
                    onContext={handleCellContext}
                    red={cell.red}
                    row={rowIndex}
                    state={cell.state}
                    value={cell.value}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            )),
        );
    };

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
        <div className="App">
            <div className="Header">
                <NumberDisplay value={bombCounter} />
                <button
                    className="Face"
                    aria-label="start/reset"
                    onClick={handleFaceClick}
                >
                    <span role="img">{face}</span>
                </button>
                <NumberDisplay status={live} gameOver={hasLost} />
            </div>
            <div className="Body">{renderCells()}</div>
        </div>
    );
};

export default App;
