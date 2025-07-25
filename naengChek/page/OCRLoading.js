import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

export default function OCRLoading({ route, navigation }) {
    const { imageData } = route.params;
    const [error, setError] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false);

    const screenHeight = Dimensions.get('window').height;
    const logoSize = screenHeight * 0.13;

    useEffect(() => {
        let timeoutId;
        let isMounted = true;

        const performOCRWithTimeout = async () => {
            try {
                setError(null);

                // HACK: OCR API 호출 시뮬레이션 (실제로는 여기에 OCR API 호출)
                timeoutId = setTimeout(async () => {
                    if (!isMounted || isCancelled) {
                        return;
                    }

                    // HACK: 유통기한 임의 설정을 위한 값 생성 (나중에는 제거)
                    const getTodayPlusDays = (days) => {
                        const date = new Date();
                        date.setDate(date.getDate() + days);
                        return date.toISOString().split('T')[0];
                    };

                    // HACK: 시뮬레이션 결과 (실제로는 OCR API 응답)
                    const mockResult = {
                        ingredients: [
                            {
                                id: 1,
                                name: '당근',
                                quantity: '200g',
                                storage: '냉장',
                                type: '채소',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(7),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                            {
                                id: 2,
                                name: '애호박',
                                quantity: '1개',
                                storage: '냉장',
                                type: '채소',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(1),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                            {
                                id: 3,
                                name: '돼지고기',
                                quantity: '500g',
                                storage: '냉동',
                                type: '육류',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(3),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                            {
                                id: 4,
                                name: '두부',
                                quantity: '1모',
                                storage: '냉장',
                                type: '가공식품',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(7),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                            {
                                id: 5,
                                name: '표고버섯',
                                quantity: '100g',
                                storage: '냉장',
                                type: '채소',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(5),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                            {
                                id: 6,
                                name: '바나나',
                                quantity: '2묶음',
                                storage: '실온',
                                type: '과일',
                                registeredDate: new Date().toISOString().split('T')[0],
                                expiryDate: getTodayPlusDays(5),
                                imageUrl: null,
                                isOCRDetected: true
                            },
                        ]
                    };

                    if (isMounted && !isCancelled) {
                        navigation.replace('OCRResult', {
                            imageData: imageData,
                            ocrResult: mockResult
                        });
                    }
                }, 2000);

            } catch (error) {
                console.error('OCR Error:', error);
                if (isMounted && !isCancelled) {
                    setError('텍스트 인식에 실패했습니다.');
                }
            }
        };

        performOCRWithTimeout();

        return () => {
            isMounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isCancelled]);


    const handleRetry = () => {
        setIsCancelled(false);
        setError(null);
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.contentContainer}>
                {error ? (
                    <View style={styles.errorContent}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                            <Text style={styles.retryButtonText}>다시 시도</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loadingContent}>
                        <View style={styles.loadingSection}>
                            {/* TODO: 로딩 로고 연결*/}
                            <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
                            </View>
                            <Text style={styles.loadingText}>식재료 정보를 인식하고 있습니다...</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    placeholder: {
        width: 40,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loadingContent: {
        flex: 1,
    },
    loadingSection: {
        alignItems: 'center',
        marginTop: 150
    },
    logoContainer: {
        backgroundColor: '#d9d9d9',
        borderRadius: 12,
        marginBottom: 24,
    },
    loadingText: {
        fontSize: 16,
        color: '#575757',
        textAlign: 'center',
    },
    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        fontSize: 16,
        color: '#575757',
        fontWeight: '600',
    },
});