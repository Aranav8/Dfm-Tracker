import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { DFM_KICK_TARGET } from '../constants/dfmConstants';

import CloseSvg from '../../../assets/icons/Close.svg';
import FootStepsSvg from '../../../assets/icons/Footsteps.svg';

type Props = {
    sheetRef: React.RefObject<BottomSheet | null>;
};

const STEPS = [
    {
        number: 1,
        text: 'Choose a time when you are least distracted or when you typically feel the fetus move.',
        highlight: ['least distracted', 'feel the fetus move'],
    },
    {
        number: 2,
        text: 'Get comfortable. Lie on your left side or sit with your feet propped up.',
        highlight: ['comfortable', 'Lie', 'left side', 'sit'],
    },
    {
        number: 3,
        text: 'Place your hands on your belly.',
        highlight: ['hands on your belly'],
    },
    {
        number: 4,
        text: 'Start a timer or watch the clock.',
        highlight: ['timer'],
    },
    {
        number: 5,
        text: `Count each kick. Keep counting until you get to ${DFM_KICK_TARGET} kicks / flutters / swishes / rolls.`,
        highlight: ['10 kicks / flutters / swishes / rolls'],
    },
    {
        number: 6,
        text: 'Once you reach 10 kicks, jot down how many minutes it took.',
        highlight: ['10 kicks', 'minutes'],
    },
];

export function InfoSheet({ sheetRef }: Props) {
    const snapPoints = useMemo(() => ['80%'], []);

    const renderTextWithHighlight = (
        text: string,
        highlights: string[]
    ): React.ReactNode[] => {
        let parts: React.ReactNode[] = [text];

        highlights.forEach(h => {
            parts = parts.flatMap(part => {
                if (typeof part !== 'string') return part;

                const regex = new RegExp(`(${h})`, 'gi');
                return part.split(regex).map((p, i) =>
                    regex.test(p) ? (
                        <Text key={`${p}-${i}`} style={styles.boldText}>
                            {p}
                        </Text>
                    ) : (
                        p
                    )
                );
            });
        });

        return parts;
    };

    return (
        <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={styles.glassSheet}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <View style={styles.outerGlass}>
                <View style={styles.innerCard}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <FootStepsSvg width={24} height={24} />
                            <Text style={styles.title}>
                                Steps to count fetal kicks
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => sheetRef.current?.close()}
                        >
                            <CloseSvg width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <BottomSheetScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                    >
                        {STEPS.map((step, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.stepRow,
                                    index % 2 === 1 && styles.stepRowAlt,
                                ]}
                            >
                                <Text style={styles.stepText}>
                                    {step.number}.{' '}
                                    {renderTextWithHighlight(
                                        step.text,
                                        step.highlight
                                    )}
                                </Text>
                            </View>
                        ))}
                    </BottomSheetScrollView>
                </View>
            </View>
        </BottomSheet>
    );
}


const styles = StyleSheet.create({
    glassSheet: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    handleIndicator: {
        backgroundColor: '#DADADA',
        width: 40,
        height: 4,
        borderRadius: 2,
    },

    outerGlass: {
        flex: 1,
        padding: 12,
    },

    innerCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
        overflow: 'hidden',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },

    content: {
        padding: 16,
        paddingBottom: 32,
    },

    stepRow: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },

    stepRowAlt: {
        backgroundColor: '#F5F5F5',
    },

    stepText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },

    boldText: {
        fontWeight: '700',
        color: '#000',
    },
});
