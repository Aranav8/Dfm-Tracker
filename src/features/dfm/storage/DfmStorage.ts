import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../shared/storage/StorageKeys';
import { DfmRecord } from '../model/DfmRecord';

type StoredDfmData = {
    version: 1;
    records: DfmRecord[];
};

export async function loadRecords(): Promise<DfmRecord[]> {
    try {
        const raw = await AsyncStorage.getItem(StorageKeys.DFM_RECORDS);
        if (!raw) return [];

        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) {
            return parsed;
        }

        if (parsed.version === 1 && Array.isArray(parsed.records)) {
            return parsed.records;
        }

        console.warn('Unexpected DFM storage format');
        return [];
    } catch (e) {
        console.warn('Failed to load DFM records', e);
        return [];
    }
}


export async function saveRecord(record: DfmRecord): Promise<void> {
    try {
        const existing = await loadRecords();

        const updated = {
            version: 1,
            records: [record, ...existing],
        };

        await AsyncStorage.setItem(
            StorageKeys.DFM_RECORDS,
            JSON.stringify(updated)
        );
    } catch (e) {
        console.warn('Failed to persist DFM record', e);
        throw e;
    }
}

