import React, { useContext } from 'react';
import './Button.scss';
import { CellState, CellValue } from '../../types';
import GameContext from '../../contexts/GameContext';

interface ButtonProps {
    col: number;
    row: number;
    red?: boolean;
    state: CellState;
    value: CellValue;
    onClick(
        rowParam: number,
        colParam: number,
    ): (...args: any[]) => void;
    onMouseDown: (...args: any[]) => void;
    onMouseUp: (...args: any[]) => void;
    onContext(
        rowParam: number,
        colParam: number,
    ): (...args: any[]) => void;
}

const Button: React.FC<ButtonProps> = ({
    col,
    onClick,
    onContext,
    red,
    row,
    state,
    value,
    onMouseDown,
    onMouseUp,
}) => {
    const [theme, mode] = useContext(GameContext);

    const renderContent = (): React.ReactNode => {
        if (state === CellState.visible) {
            if (value === CellValue.bomb) {
                return (
                    <span role="img" aria-label="bomb">
                        💣
                    </span>
                );
            } else if (value === CellValue.none) {
                return null;
            }

            return value;
        } else if (state === CellState.flagged) {
            return (
                <span role="img" aria-label="flag">
                    🚩
                </span>
            );
        }

        return null;
    };

    const classes = [
        `${theme}--button`,
        `${theme}--button-${mode}`,
        state === CellState.visible
            ? `${theme}--button-${mode}__visible`
            : '',
        `value-${value}`,
        red ? `${theme}--button-${mode}__red` : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            aria-label={`button-row${row}-column${col}`}
            className={classes}
            onClick={onClick(row, col)}
            onContextMenu={onContext(row, col)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {renderContent()}
        </button>
    );
};

export default Button;
