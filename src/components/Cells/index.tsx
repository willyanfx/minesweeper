import React from 'react';
import Button from '../Button';
import { Cell } from '../../types';

const Cells = ({
    state,
    onClick,
    onContext,
    onMouseDown,
    onMouseUp,
}: any) => {
    return state.map((row: Cell[], rowIndex: number) => {
        return row.map((cell, colIndex) => (
            <Button
                col={colIndex}
                key={`${rowIndex}-${colIndex}`}
                onClick={onClick}
                onContext={onContext}
                red={cell.red}
                row={rowIndex}
                state={cell.state}
                value={cell.value}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            />
        ));
    });
};
export default Cells;