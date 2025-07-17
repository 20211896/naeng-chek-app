import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ActivityIndicator,
    TouchableOpacity,
    Alert 
} from 'react-native';

export default function OCRLoading({ route, navigation }) {
    const { imageData } = route.params;
    const [ocrResult, setOcrResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        performOCR();
    }, []);

    const performOCR = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // HACK: OCR API 호출 시뮬레이션 (실제로는 여기에 OCR API 호출)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // HACK: 시뮬레이션 결과 (실제로는 OCR API 응답)
            const mockResult = {
                ingredients: ['당근 200g', '양파 1개', '감자 3개', '돼지고기 300g'],
                confidence: 85,
                rawText: '당근 200g\n양파 1개\n감자 3개\n돼지고기 300g'
            };

            setOcrResult(mockResult);
            setIsLoading(false);

        } catch (error) {
            console.error('OCR Error:', error);
            setError('텍스트 인식에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        performOCR();
    };

    // TODO: 결과 확인 함수 -> 분석정보 페이지로 이동 로직 추가 필요 
    const handleConfirm = () => {
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
                <Text style={styles.title}>텍스트 인식 중</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: imageData.uri }} style={styles.image} />
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}
            </View>

            {/* HACK: 상태별 컨텐츠 */}
            <View style={styles.contentContainer}>
                {isLoading && (
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size="large" color="#575757" />
                        <Text style={styles.loadingText}>식재료 정보를 인식하고 있습니다...</Text>
                    </View>
                )}

                {error && (
                    <View style={styles.errorContent}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                            <Text style={styles.retryButtonText}>다시 시도</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {ocrResult && !isLoading && (
                    <View style={styles.resultContent}>
                        <Text style={styles.resultTitle}>인식된 식재료</Text>
                        <Text style={styles.confidenceText}>인식률: {ocrResult.confidence}%</Text>
                        
                        <View style={styles.ingredientsList}>
                            {ocrResult.ingredients.map((ingredient, index) => (
                                <View key={index} style={styles.ingredientItem}>
                                    <Text style={styles.ingredientText}>{ingredient}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.button, styles.retryButton]} 
                                onPress={handleRetry}
                            >
                                <Text style={styles.retryButtonText}>다시 인식</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.button, styles.confirmButton]} 
                                onPress={handleConfirm}
                            >
                                <Text style={styles.confirmButtonText}>확인</Text>
                            </TouchableOpacity>
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
    cancelText: {
        fontSize: 16,
        color: '#575757',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    placeholder: {
        width: 40,
    },
    imageContainer: {
        height: 250,
        margin: 20,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
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
    resultContent: {
        flex: 1,
        paddingTop: 20,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
    },
    confidenceText: {
        fontSize: 14,
        color: '#575757',
        marginBottom: 20,
    },
    ingredientsList: {
        flex: 1,
        marginBottom: 20,
    },
    ingredientItem: {
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    ingredientText: {
        fontSize: 16,
        color: '#000000',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingBottom: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    retryButton: {
        backgroundColor: '#f0f0f0',
    },
    retryButtonText: {
        fontSize: 16,
        color: '#575757',
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#575757',
    },
    confirmButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
    },
});