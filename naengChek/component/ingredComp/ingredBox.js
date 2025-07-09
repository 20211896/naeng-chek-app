import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 40 - 13) * 0.13;

export default function IngredBox({ navigation }) {
    return (
        // TODO: 데이터 연결하기
        <View style={styles.ingred}>
            <Image style={styles.ingredImg} source={{ uri: 'https://picsum.photos/80/80' }} />

            <View style={styles.ingredTextBox}>
                <View style={styles.ingredText}>
                    <Text style={styles.ingredTextItem}>재료</Text>
                    <View style={styles.explainText}>
                        <Text style={styles.explainTextItem}>보관장소</Text>
                        <Text style={styles.explainTextItem}>유통기한</Text>
                    </View>
                </View>
                <Text style={styles.ingredTextItem}>수량</Text>
            </View>
        </View>

    );
} const styles = StyleSheet.create({
    ingred: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',

        //HACK : 레이아웃 확인용
        borderWidth: 1,
        borderColor: '#000000',
    },
    ingredImg: {
        width: imageSize,
        height: imageSize,
        marginRight: 13,
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
        fontWeight: 550
    },
});

