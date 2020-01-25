import React from 'react';
import './Button.scss';
import { CellState, CellValue } from '../../types';

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
}) => {
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

    return (
        <div
            role="button"
            aria-label="button"
            className={`Button ${
                state === CellState.visible ? 'visible' : ''
            } value-${value} ${red ? 'red' : ''}`}
            onClick={onClick(row, col)}
            onContextMenu={onContext(row, col)}
        >
            {renderContent()}
        </div>
    );
};

export default Button;
