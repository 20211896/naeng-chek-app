import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 40 - 13) * 0.13;

export default function IngredBox({ ingredient, navigation }) {


    // 유통기한 텍스트 포맷팅
    const formatExpiryDate = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return '만료됨';
        if (diffDays === 0) return '오늘까지';
        if (diffDays === 1) return '내일까지';
        if (diffDays <= 7) return `${diffDays}일 후`;
        
        // 날짜 형식으로 표시
        const month = expiry.getMonth() + 1;
        const day = expiry.getDate();
        return `${month}/${day}`;
    };

    return (
        <View style={styles.ingred}>
            <Image 
                style={styles.ingredImg} 
                source={{ uri: ingredient.imageUrl || 'https://picsum.photos/80/80' }} 
            />

            <View style={styles.ingredTextBox}>
                <View style={styles.ingredText}>
                    <Text style={styles.ingredTextItem}>{ingredient.name}</Text>
                    <View style={styles.explainText}>
                        <Text style={styles.explainTextItem}>{ingredient.storage}</Text>
                        <Text style={styles.explainTextItem}>
                            {formatExpiryDate(ingredient.expiryDate)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.ingredTextItem}>{ingredient.quantity}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ingred: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    ingredImg: {
        width: imageSize,
        height: imageSize,
        marginRight: 13,
        borderRadius: 8,
    },
    ingredTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    ingredText: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: imageSize,
    },
    explainText: {
        flexDirection: 'row',
        gap: 15,
    },
    explainTextItem: {
        fontSize: 14,
        color: '#929292',
    },
    ingredTextItem: {
        fontSize: 15,
        fontWeight: '550'
    },
});