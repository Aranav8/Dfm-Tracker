import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../features/dfm/views/HomeScreen';
import { RecordDfmScreen } from '../../features/dfm/views/RecordDfmScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Record"
                component={RecordDfmScreen}
            />
        </Stack.Navigator>
    );
}