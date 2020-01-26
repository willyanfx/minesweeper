import React, { useState, useEffect } from 'react';
import './NumberDisplay.scss';
import useInterval from '../../hooks/useInterval';

interface NumberDisplayProps {
    value?: number;
    status?: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({
    value,
    status = false,
}) => {
    const [time, setTime] = useState<number>(0);
    useInterval(() => {
        setTime(time + 1);
    }, status);

    useEffect(() => {
        setTime(0);
    }, [!status]);

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
