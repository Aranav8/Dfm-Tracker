import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DfmRecord } from '../model/DfmRecord';

export function RecordItem({ record }: { record: DfmRecord }) {
    const date = new Date(record.startedAt);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();

    const formattedDate = `${dayName} · ${day} ${month} ${year}`;

    const minutes = Math.floor(record.durationSeconds / 60);
    const seconds = record.durationSeconds % 60;
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.minutesText}>{formattedDuration}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },

    dateText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000',
    },

    minutesText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },
});
