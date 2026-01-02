import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useHomeViewModel } from '../viewmodel/HomeViewModel';
import { RecordItem } from '../components/RecordItem';

import BabySvg from '../../../assets/icons/Baby.svg';
import LeapSvg from '../../../assets/icons/Leap.svg';
import BookmarkSvg from '../../../assets/icons/Bookmark.svg';

export function HomeScreen({ navigation }: any) {
    const { records } = useHomeViewModel();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.headerLeft} />
                    <Text style={styles.headerTitle}>DFM (Kick counter)</Text>

                    <View style={styles.badgeContainer}>
                        <BabySvg width={24} height={24} />
                        <Text style={styles.badgeCount}>0</Text>
                    </View>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                </View>
            </View>

            <View style={styles.articleCard}>
                <ImageBackground
                    source={require('../../../assets/images/article-bg.jpg')}
                    style={styles.articleImageContainer}
                    imageStyle={styles.articleImageStyle}
                >
                    <LinearGradient
                        colors={[
                            'rgba(255,255,255,0.35)',
                            'rgba(255,255,255,0.1)',
                        ]}
                        style={StyleSheet.absoluteFillObject}
                    />

                    <View style={styles.leapLabel}>
                        <LeapSvg width={48} height={24} />
                        <Text style={styles.leapLabelText}>Articles</Text>
                    </View>


                    <TouchableOpacity style={styles.saveButtonWrapper}>
                        <LinearGradient
                            colors={[
                                'rgba(255,255,255,1)',
                                'rgba(255,255,255,1)',
                            ]}
                            style={styles.saveButton}
                        >
                            <BookmarkSvg width={16} height={16} />
                            <Text style={styles.saveText}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.articleTitleContainer}>
                        <LinearGradient
                            colors={[
                                'rgba(0,0,0,0.65)',
                                'rgba(0,0,0,0.25)',
                                'rgba(0,0,0,0)',
                            ]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.titleGradient}
                        />

                        <Text style={styles.articleTitle}>
                            DFM (fetal movement)
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            <TouchableOpacity
                style={styles.recordButton}
                onPress={() => navigation.navigate('Record')}
            >
                <Text style={styles.recordButtonText}>
                    Record fetal movement
                </Text>
            </TouchableOpacity>

            <View style={styles.pastRecordsContainer}>
                <Text style={styles.pastRecordsTitle}>Past records</Text>

                <FlatList
                    data={records}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <RecordItem record={item} />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No records yet</Text>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerLeft: {
        width: 60,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        paddingTop: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.07)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    badgeCount: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
    },
    dividerContainer: {
        paddingHorizontal: 0,
    },
    divider: {
        borderBottomWidth: 1.5,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
    },

    articleCard: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: '#fff',
    },
    articleImageContainer: {
        width: '100%',
        height: 160,
    },
    articleImageStyle: {
        borderRadius: 20,
    },

    leapBadgeWrapper: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    leapBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    articlesText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },

    saveButtonWrapper: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    saveText: {
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
    },

    articleTitleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 24,
    },
    titleGradient: {
        ...StyleSheet.absoluteFillObject,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
    },

    recordButton: {
        marginHorizontal: 20,
        marginTop: 24,
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#121212',
    },
    recordButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },

    pastRecordsContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 20,
    },
    pastRecordsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
    leapLabel: {
        position: 'absolute',
        top: 16,
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    leapLabelText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
});
