import React, { useState, useEffect } from 'react';
import './NumberDisplay.scss';
import useInterval from '../../hooks/useInterval';

interface NumberDisplayProps {
    value?: number;
    live?: boolean;
    gameOver?: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({
    value,
    live = false,
    gameOver,
}) => {
    const [time, setTime] = useState<number>(0);
    useInterval(() => {
        setTime(time + 1);
    }, live);

    useEffect(() => {
        if (gameOver) return;
        if (live && !gameOver) setTime(0);
    }, [!live, gameOver]);

    if (value) {
        return (
            <div className="NumberDisplay">
                {value.toString().padStart(3, '0')}
            </div>
        );
    }
    return (
        <div className="NumberDisplay">
            {time.toString().padStart(3, '0')}
        </div>
    );
};

export default NumberDisplay;
