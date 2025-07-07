import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Btn_1_4 from '../btnStyle/size1-4';

export default function TodayFoodBox({ navigation }) {
    return (
        // TODO: 데이터 연결하기
        <View style={styles.food}>
            <Image style={styles.foodImg} source={{ uri: 'https://picsum.photos/80/80' }} />

            <View style={styles.foodText}>
                <Text>요리명</Text>
                <View style={styles.ingredients}>
                    <Btn_1_4 title="재료" fontSize={10} onPress={() => { }} />
                    <Btn_1_4 title="재료" fontSize={10} onPress={() => { }} />
                </View>
                <Text>설명</Text>
            </View>
        </View>

    );
} const styles = StyleSheet.create({
    food: {
        paddingHorizontal: 16,
        paddingVertical: 19,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 5,

        //HACK : 레이아웃 확인용
        borderWidth: 1,
        borderColor: '#000000',
    },
    foodImg: {
        width: '24%',
        aspectRatio: 1,
        marginRight: 13,
    },
    foodText: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    ingredients: {
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap',
    }
});

