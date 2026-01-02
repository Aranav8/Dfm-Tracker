import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { DfmRecord } from '../model/DfmRecord';
import { loadRecords } from '../storage/DfmStorage';

export function useHomeViewModel() {
    const [records, setRecords] = useState<DfmRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        const data = await loadRecords();
        const sorted = data.sort(
            (a, b) => b.startedAt - a.startedAt
        );
        setRecords(sorted);
        setLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load])
    );

    return {
        records,
        loading,
    };
}
