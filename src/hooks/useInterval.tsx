// reference https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useRef, useEffect } from 'react';

function useInterval<T>(callback: T, running: boolean) {
    const savedCallback: any = useRef(null);

    console.log(callback);
    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (running) {
            let id = setInterval(tick, 1000);
            return () => clearInterval(id);
        }
    }, [running]);
}

export default useInterval;
