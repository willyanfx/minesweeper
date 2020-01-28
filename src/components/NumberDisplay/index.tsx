import React, { useState, useEffect, useContext } from 'react';
import './NumberDisplay.scss';
import useInterval from '../../hooks/useInterval';
import ThemeContext from '../../contexts/theme';

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

    const [theme, mode] = useContext(ThemeContext);

    useInterval(() => {
        setTime(time + 1);
    }, live);

    const classes = [
        'numberDisplay',
        `${theme}--numberDisplay`,
        `${theme}--numberDisplay-${mode}`,
    ]
        .filter(Boolean)
        .join(' ');

    useEffect(() => {
        if (gameOver) return;
        if (!live && !gameOver) setTime(0);
    }, [live, gameOver]);

    if (value) {
        return (
            <div className={classes}>
                {value.toString().padStart(3, '0')}
            </div>
        );
    }
    return (
        <div className={classes}>
            {time.toString().padStart(3, '0')}
        </div>
    );
};

export default NumberDisplay;
