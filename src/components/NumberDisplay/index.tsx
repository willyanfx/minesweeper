import React, { useState, useEffect, useContext } from 'react';
import NumberFlow, {
    NumberFlowGroup,
    type Format,
} from '@number-flow/react';
import './NumberDisplay.css';
import useInterval from '../../hooks/useInterval';
import { StateContext } from '../../contexts/GameContext';

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
    const { theme, mode } = useContext(StateContext);
    const classes = [
        'numberDisplay',
        `${theme}--numberDisplay`,
        `${theme}--numberDisplay-${mode}`,
    ]
        .filter(Boolean)
        .join(' ');

    const format: Format = {
        notation: 'standard',
        compactDisplay: 'short',
        minimumIntegerDigits: 3,
    };

    return (
        <NumberFlowGroup>
            <div className={classes}>
                <span
                    className={`${theme}--numberDisplay-${mode}__numbers`}
                >
                    <NumberFlow
                        willChange
                        continuous
                        trend={0}
                        format={format}
                        opacityTiming={{
                            duration: 350,
                            easing: 'ease-out',
                        }}
                        value={value}
                    />
                    {/* {value.toString().padStart(3, '0')} */}
                </span>
            </div>
        </NumberFlowGroup>
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
