import React, { useState, useEffect, useContext } from 'react';
import './NumberDisplay.scss';
import useInterval from '../../hooks/useInterval';
import GameContext from '../../contexts/GameContext';

type NumberDisplayProps = {
    value?: number;
};
type TimerDisplayProps = {
    live: boolean;
    timer: boolean;
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({
    value = 10,
}) => {
    const [theme, mode] = useContext(GameContext);

    const classes = [
        'numberDisplay',
        `${theme}--numberDisplay`,
        `${theme}--numberDisplay-${mode}`,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            <span
                className={`${theme}--numberDisplay-${mode}__numbers`}
            >
                {value.toString().padStart(3, '0')}
            </span>
        </div>
    );
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({
    live = false,
    timer,
}) => {
    const [time, setTime] = useState<number>(0);

    useInterval(() => {
        if (live && time < 999) {
            setTime(time + 1);
        }
    }, live);
    useEffect(() => {
        setTime(0);
    }, [timer]);

    return <NumberDisplay value={time} />;
};

export { NumberDisplay, TimerDisplay };
