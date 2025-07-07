import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Btn_1_2 from '../btnStyle/size1-2';

export default function MyFoodBox({ navigation }) {
    const remaining = 3;
    const total = 5;
    const ratio = remaining / total;

    const getStatusColor = () => {
        // HACK: 임시 색&비율 설정
        if (ratio > 0.7) return '#4CAF50'; // 초록 - 충분
        if (ratio > 0.3) return '#FF9800'; // 주황 - 보통
        return '#F44336'; // 빨강 - 부족
    };

    return (
        // TODO: 데이터 연결하기

        <View style={styles.food}>
            <Image style={styles.foodImg} source={{ uri: 'https://picsum.photos/80/80' }} />

            <View style={styles.textContainer}>
                <View style={styles.foodText}>
                    <Text>DDAY</Text>
                    <Text>재료</Text>
                </View>
                <View style={styles.foodText}>
                    <Text style={styles.quantityText}>{remaining}/{total}개</Text>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, {
                            width: `${ratio * 100}%`,
                            backgroundColor: getStatusColor()
                        }]} />
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Btn_1_2 title="요리 추천" onPress={() => { }} />
                <Btn_1_2 title="편집" onPress={() => { }} />
            </View>
        </View>

    );
} const styles = StyleSheet.create({
    food: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,

        //HACK : 레이아웃 확인용
        borderWidth: 1,
        borderColor: '#000000',
    },
    foodImg: {
        marginRight: 13,
        aspectRatio: 1,
        width: '11.5%',
    },
    textContainer: {
        flexDirection: 'row',
        gap: 26,
        flex: 1,
    },
    foodText: {
        flexDirection: 'column',
    },
    quantityText: {
        fontSize: 12,
        marginBottom: 4,
    },
    progressContainer: {
        width: 60,
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    }
});

