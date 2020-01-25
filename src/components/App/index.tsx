import React, { useState, useEffect } from 'react';
import './App.scss';
import NumberDisplay from '../NumberDisplay';
import Button from '../Button';
import { generateCells, openMultipleCells } from '../../utils';
import { Face, Cell, CellValue, CellState } from '../../types';

const App: React.FC = () => {
    const [cells, setCells] = useState<Cell[][]>(generateCells());
    const [face, setFace] = useState<Face>(Face.smile);
    const [time, setTime] = useState<number>(0);
    const [live, setlive] = useState<boolean>(false);
    useEffect(() => {
        const handleMouseDown = () => {
            setFace(Face.oh);
        };
        const handleMouseUp = () => {
            setFace(Face.smile);
        };
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleCellClick = (
        rowParam: number,
        colParam: number,
    ) => (): void => {
        if (!live) {
            setlive(true);
        }

        const currentCell = cells[rowParam][colParam];
        let newCells = cells.slice();

        if (
            [CellState.flagged, CellState.visible].includes(
                currentCell.state,
            )
        ) {
            return;
        }

        if (currentCell.value === CellValue.bomb) {
        } else if (currentCell.value === CellValue.none) {
            newCells = openMultipleCells(
                newCells,
                rowParam,
                colParam,
            );
            setCells(newCells);
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
            setCells(newCells);
        }
    };

    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
                <Button
                    key={`${rowIndex}-${colIndex}`}
                    state={cell.state}
                    value={cell.value}
                    onClick={handleCellClick}
                    row={rowIndex}
                    col={colIndex}
                />
            )),
        );
    };
    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={0} />
                <div role="button" className="Face">
                    <span role="img" aria-label="face">
                        {face}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="Body">{renderCells()}</div>
        </div>
    );
};

export default App;
