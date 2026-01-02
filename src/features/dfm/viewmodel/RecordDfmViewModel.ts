import { useEffect, useRef, useState } from 'react';
import { saveRecord } from '../storage/DfmStorage';
import { DfmRecord } from '../model/DfmRecord';
import uuid from 'react-native-uuid';
import { MIN_SESSION_SECONDS } from '../constants/dfmConstants';

export function useRecordDfmViewModel(onSaved: () => void) {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startedAtRef = useRef<number | null>(null);

    function start() {
        if (running) return;

        startedAtRef.current = Date.now();
        setRunning(true);

        intervalRef.current = setInterval(() => {
            if (!startedAtRef.current) return;
            const diff = Math.floor(
                (Date.now() - startedAtRef.current) / 1000
            );
            setSeconds(diff);
        }, 1000);
    }


    function stop() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setRunning(false);
    }

    async function save(): Promise<boolean> {
        if (!startedAtRef.current) return false;
        if (seconds < MIN_SESSION_SECONDS) return false;

        try {
            const record: DfmRecord = {
                id: uuid.v4().toString(),
                startedAt: startedAtRef.current,
                durationSeconds: seconds,
            };

            await saveRecord(record);
            stop();
            onSaved();
            return true;
        } catch (e) {
            console.warn('Save failed', e);
            return false;
        }
    }


    function discard() {
        stop();
    }

    useEffect(() => {
        return () => stop();
    }, []);

    return {
        seconds,
        running,
        start,
        stop,
        save,
        discard,
    };
}
