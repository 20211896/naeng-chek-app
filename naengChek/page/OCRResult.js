import React, { useState, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomBottomSheet from '../component/customBottomSheet';
import InputBox from '../component/inputBox';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height * (50 / 812)


export default function OCRResult({ route, navigation }) {
    const { imageData, ocrResult } = route.params;
    const [ingredients, setIngredients] = useState(ocrResult.ingredients);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [editedQuantity, setEditedQuantity] = useState('');
    const [editedStorage, setEditedStorage] = useState('');
    const [editedExpiryDate, setEditedExpiryDate] = useState('');

    const bottomSheetRef = useRef(null);

    const handleRetry = () => {
        navigation.replace('OCRLoading', { imageData: imageData });
    };

    const handleConfirm = () => {
        // TODO: 데이터베이스에 저장되어 보유 식재료 목록에 추가됨
        navigation.navigate('Ingredient', {
            ingredients: ingredients,
            imageData: imageData
        });
    };

    const groupByType = (ingredients) => {
        return ingredients.reduce((acc, ingredient) => {
            const { type } = ingredient;
            if (!acc[type]) acc[type] = [];
            acc[type].push(ingredient);
            return acc;
        }, {});
    };

    const handleRemove = (ingredientToRemove) => {
        const updated = ingredients.filter(ingredient =>
            !(ingredient.name === ingredientToRemove.name &&
                ingredient.type === ingredientToRemove.type &&
                ingredient.expiryDate === ingredientToRemove.expiryDate)
        );
        setIngredients(updated);
        bottomSheetRef.current?.close();
    };

    const handleCancel = () => {
        navigation.navigate('Ingredient');
    };

    // NOTE: 바텀시트 재료별 초기값 - OCR로 판별한 내용
    const handleIngredientPress = (ingredient) => {
        setSelectedIngredient(ingredient);
        setEditedQuantity(ingredient.quantity);
        setEditedStorage(ingredient.storage);
        setEditedExpiryDate(ingredient.expiryDate);
        bottomSheetRef.current?.expand();
    };

    const handleBottomSheetClose = () => {
        bottomSheetRef.current?.close();
        setSelectedIngredient(null);
    };

    const handleStorageSelect = (storage) => {
        setEditedStorage(storage);
    };

    const handleSaveQuantity = () => {
        if (editedQuantity.trim() === '') return;

        const updatedIngredients = ingredients.map(ingredient =>
            ingredient.name === selectedIngredient.name &&
                ingredient.type === selectedIngredient.type &&
                ingredient.expiryDate === selectedIngredient.expiryDate
                ? {
                    ...ingredient,
                    quantity: editedQuantity,
                    storage: editedStorage,
                    expiryDate: editedExpiryDate,
                }
                : ingredient
        );

        setIngredients(updatedIngredients);
        setSelectedIngredient({
            ...selectedIngredient,
            quantity: editedQuantity,
            storage: editedStorage,
            expiryDate: editedExpiryDate,
        });

        bottomSheetRef.current?.close();
    };

    const formatDateInput = (text) => {
        const numbers = text.replace(/\D/g, '');

        const limited = numbers.substring(0, 8);

        if (limited.length <= 4) {
            return limited;
        } else if (limited.length <= 6) {
            return `${limited.substring(0, 4)}-${limited.substring(4)}`;
        } else {
            return `${limited.substring(0, 4)}-${limited.substring(4, 6)}-${limited.substring(6)}`;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>인식 결과</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: imageData.uri }} style={styles.image} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.resultContent}>
                    <View style={styles.resultTitleBox}>
                        <Text style={styles.resultTitle}>추가된 식재료</Text>
                        <Text style={styles.resultEATitle}>{ingredients.length}개</Text>
                    </View>

                    <ScrollView>
                        <View style={styles.ingredientsList}>
                            {Object.entries(groupByType(ingredients)).map(([type, items]) => (
                                <View key={type} style={{ marginBottom: 16 }}>
                                    <Text style={styles.typeHeader}>{type}</Text>
                                    {items.map((ingredient, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={styles.ingredientItem}
                                            onPress={() => handleIngredientPress(ingredient)}
                                            activeOpacity={0.7}
                                        >
                                            <View style={styles.ingredientTextBox}>
                                                <Text style={styles.ingredientText}>
                                                    {ingredient.name}
                                                </Text>
                                                <Text style={styles.ingredientSideText}>
                                                    {ingredient.storage} {'\u2022'} {ingredient.expiryDate} 까지
                                                </Text>
                                            </View>
                                            <View style={styles.ingredientEABox}>
                                                <Text style={styles.ingredientText}>
                                                    {ingredient.quantity}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={(e) => {
                                                        e.stopPropagation();
                                                        handleRemove(ingredient);
                                                    }}
                                                >
                                                    <AntDesign name="minuscircle" size={18} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>

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
            </View>

            <CustomBottomSheet
                ref={bottomSheetRef}
                onBackdropPress={handleBottomSheetClose}
            >
                {selectedIngredient && (
                    <View style={styles.bottomSheetContent}>
                        <View style={styles.bottomSheetHeader}>
                            <Text style={styles.bottomSheetTitle}>{selectedIngredient.name}</Text>
                            <TouchableOpacity onPress={handleBottomSheetClose}>
                                <AntDesign name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailContainer}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>수량</Text>
                                <InputBox
                                    value={editedQuantity}
                                    onChangeText={setEditedQuantity}
                                    keyboardType="default"
                                />
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>보관방법</Text>
                                <View style={styles.selectBox}>
                                    {['냉장', '냉동', '실온'].map((storage) => (
                                        <TouchableOpacity
                                            key={storage}
                                            onPress={() => handleStorageSelect(storage)}
                                            style={[
                                                styles.select,
                                                editedStorage === storage && styles.selectedSelect
                                            ]}
                                        >
                                            <Text style={styles.detailValue}>
                                                {storage}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>유통기한</Text>
                                <InputBox
                                    value={editedExpiryDate}
                                    onChangeText={(text) => {
                                        const formatted = formatDateInput(text);
                                        setEditedExpiryDate(formatted);
                                    }}
                                    keyboardType="numeric"
                                    placeholder="0000-00-00"
                                    maxLength={10}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomSheetButtonContainer}>
                            <TouchableOpacity
                                style={styles.bottomButton}
                                onPress={() => handleRemove(selectedIngredient)}
                            >
                                <AntDesign name="delete" size={16} color="white" />
                                <Text style={styles.bottomButtonText}>제거하기</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.bottomButton}
                                onPress={handleSaveQuantity}
                            >
                                <AntDesign name="check" size={16} color="white" />
                                <Text style={styles.bottomButtonText}>수정하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </CustomBottomSheet>
        </View >
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
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultContent: {
        flex: 1,
        paddingTop: 20,
    },
    resultTitleBox: {
        marginBottom: 8,
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        marginRight: 5,
    },
    resultEATitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
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
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },
    ingredientTextBox: {
        flexDirection: 'column',
    },
    ingredientEABox: {
        flexDirection: 'row',
        gap: 13,
        alignItems: 'center',
    },
    ingredientText: {
        fontSize: 16,
        fontWeight: '550',
        color: '#000000',
    },
    ingredientSideText: {
        fontSize: 14,
        color: '#929292',
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
    typeHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
        marginTop: 10,
    },
    // 바텀시트 스타일
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    bottomSheetTitle: {
        fontSize: 26,
        fontWeight: '600',
        color: '#000000',
    },
    detailContainer: {
        flex: 1,
    },
    detailRow: {
        flexDirection: 'column',
        paddingVertical: 12,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    detailLabel: {
        fontSize: 20,
        fontWeight: '550',
        color: '#000000',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    selectBox: {
        height: screenHeight,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    select: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 13,
        marginHorizontal: 2,
    },
    selectedSelect: {
        backgroundColor: '#fff',
    },
    bottomSheetButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight,
        flex: 1,
        backgroundColor: '#555555',
        paddingVertical: 14,
        borderRadius: 8,
    },
    bottomButtonText: {
        fontSize: 16,
        fontWeight: '550',
        color: 'white',
    },
});