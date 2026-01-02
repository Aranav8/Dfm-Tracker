import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Animated,
    Easing,
    Alert,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { TimerDisplay } from '../components/TimerDisplay';
import { InfoSheet } from '../components/InfoSheet';
import { useRecordDfmViewModel } from '../viewmodel/RecordDfmViewModel';
import { DFM_KICK_TARGET } from '../constants/dfmConstants';
import { formatSeconds } from '../../../shared/utils/time';

import InfoSvg from '../../../assets/icons/Info.svg';
import BackSvg from '../../../assets/icons/Back.svg';

export function RecordDfmScreen({ navigation }: any) {
    const sheetRef = useRef<BottomSheet>(null);
    const vm = useRecordDfmViewModel(() => navigation.goBack());

    const handleSave = async () => {
        const formattedTime = formatSeconds(vm.seconds);

        Alert.alert(
            'Save session?',
            `You recorded ${DFM_KICK_TARGET} kicks in ${formattedTime}.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Save',
                    onPress: async () => {
                        const success = await vm.save();
                        if (!success) {
                            Alert.alert(
                                'Session too short',
                                'Please record movements for at least 1 minute before saving.'
                            );
                        }
                    },
                },
            ]
        );
    };


    const handleBackPress = () => {
        if (vm.running) {
            Alert.alert(
                'Discard session?',
                'Your current recording will be lost.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => {
                            vm.discard();
                            navigation.goBack();
                        },
                    },
                ]
            );
        } else {
            vm.discard();
            navigation.goBack();
        }
    };


    const ripple1 = useRef(new Animated.Value(0)).current;
    const ripple2 = useRef(new Animated.Value(0)).current;
    const ripple3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createRipple = (anim: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2200,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 2200,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        createRipple(ripple1, 0);
        createRipple(ripple2, 400);
        createRipple(ripple3, 800);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <BackSvg width={20} height={20} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Record DFM</Text>

                    <TouchableOpacity style={styles.infoButton} onPress={() => sheetRef.current?.expand()}>
                        <InfoSvg width={28} height={28} />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />
            </View>

            <ImageBackground
                source={require('../../../assets/images/record-bg.png')}
                style={styles.body}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>
                            Stop recording after{'\n'}{DFM_KICK_TARGET} kicks
                        </Text>
                        <View style={styles.bubbleArrow} />
                    </View>

                    <View style={styles.timerWrapper}>
                        <View style={styles.glow} />
                        <Animated.View
                            style={[
                                styles.ripple,
                                {
                                    transform: [
                                        {
                                            scale: ripple1.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 1.2],
                                            }),
                                        },
                                    ],
                                    opacity: ripple1.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.6, 0.2],
                                    }),
                                },
                            ]}
                        />

                        <Animated.View
                            style={[
                                styles.ripple,
                                styles.rippleMid,
                                {
                                    transform: [
                                        {
                                            scale: ripple2.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 1.35],
                                            }),
                                        },
                                    ],
                                    opacity: ripple2.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.45, 0.15],
                                    }),
                                },
                            ]}
                        />

                        <Animated.View
                            style={[
                                styles.ripple,
                                styles.rippleOuter,
                                {
                                    transform: [
                                        {
                                            scale: ripple3.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 1.55],
                                            }),
                                        },
                                    ],
                                    opacity: ripple3.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.3, 0.1],
                                    }),
                                },
                            ]}
                        />

                        <View style={styles.timerCenter}>
                            <TimerDisplay seconds={vm.seconds} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={vm.running ? vm.stop : vm.start}
                    >
                        {vm.running ? (
                            <View style={styles.stopIcon} />
                        ) : (
                            <View style={styles.playIcon} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        disabled={vm.seconds === 0}
                    >
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <Text
                        style={styles.linkText}
                        onPress={() => sheetRef.current?.expand()}
                    >
                        What if I am not getting{'\n'}enough kicks?
                    </Text>
                </View>
            </ImageBackground>

            <InfoSheet sheetRef={sheetRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F0FF',
    },

    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        paddingTop: 10,
    },

    infoButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },

    divider: {
        borderBottomWidth: 1.5,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
    },

    body: {
        flex: 1,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },

    messageBubble: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 28,
        paddingVertical: 18,
        borderRadius: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
    },

    messageText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 26,
        color: '#000',
    },

    bubbleArrow: {
        position: 'absolute',
        bottom: -8,
        left: '35%',
        marginLeft: -8,
        width: 16,
        height: 16,
        backgroundColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
    },

    timerWrapper: {
        width: 260,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    ripple: {
        position: 'absolute',
        width: 200,
        height: 120,
        borderRadius: 60,
        borderWidth: 2.5,
        borderColor: 'rgba(255,255,255,1)',
    },

    rippleMid: {
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.9)',
    },

    rippleOuter: {
        borderWidth: 3.5,
        borderColor: 'rgba(255,255,255,0.75)',
    },
    glow: {
        position: 'absolute',
        width: 180,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    timerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    controlButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },

    playIcon: {
        width: 0,
        height: 0,
        borderTopWidth: 14,
        borderBottomWidth: 14,
        borderLeftWidth: 22,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#000',
        marginLeft: 4,
    },

    stopIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#000',
        borderRadius: 2,
    },

    bottom: {
        paddingHorizontal: 20,
        paddingBottom: 36,
        alignItems: 'center',
    },

    saveButton: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
    },

    saveText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },

    linkText: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        textDecorationLine: 'underline',
        lineHeight: 20,
    },
});
