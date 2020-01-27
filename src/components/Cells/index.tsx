import React, { useMemo } from 'react';
import Button from '../Button';

const Cells = ({
    state,
    onClick,
    onContext,
    onMouseDown,
    onMouseUp,
}: any) => {
    const renderCells = useMemo(
        () =>
            state.map((row: any[], rowIndex: number) => {
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
            }),
        [state],
    );
    return renderCells;
};
export default Cells;
