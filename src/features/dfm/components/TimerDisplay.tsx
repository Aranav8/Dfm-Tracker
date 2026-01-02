import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function TimerDisplay({ seconds }: { seconds: number }) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return <Text style={styles.text}>{formattedTime}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 48,
        fontWeight: '600',
        color: '#F04E3E',
        letterSpacing: 2,
    },
});
