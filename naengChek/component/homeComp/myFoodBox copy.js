import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function TodayFoodBox({ navigation }) {
    return (
        // TODO: 데이터 연결하기
        <View style={styles.food}>
            <Image style={styles.foodImg} source={{ uri: 'https://picsum.photos/80/80' }}/>

            <View style={styles.foodText}>
                <Text>요리명</Text>
                <Text>재료</Text>
                <Text>설명</Text>
            </View>
        </View>

    );
} const styles = StyleSheet.create({
    food: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 19,
        borderRadius: 5,

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada"
    },
    foodImg: {
        width: '24%',         
        aspectRatio: 1,       
        marginRight: 13,      
    },
    foodText: {
        flexDirection: 'column',
    }
});

