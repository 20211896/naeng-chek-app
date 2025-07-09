import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomBtn from '../btnStyle/customBtn';

export default function MyFoodBox({ navigation }) {
    const remaining = 3;
    const total = 5;
    const ratio = remaining / total;

    const getStatusColor = () => {
        // HACK: 임시 색&비율 설정
        if (ratio > 0.7) return '#4CAF50';
        if (ratio > 0.3) return '#FF9800';
        return '#F44336';
    };

    return (
        // TODO: 데이터 연결하기

        <View style={styles.food}>
            <Image style={styles.foodImg} source={{ uri: 'https://picsum.photos/80/80' }} />

            <View style={styles.foodText1}>
                <Text style={styles.dday}>DDAY</Text>
                <Text>재료</Text>
            </View>

            <View style={styles.foodText2}>
                <Text style={styles.quantityText}>{remaining}/{total}개</Text>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, {
                        width: `${ratio * 100}%`,
                        backgroundColor: getStatusColor()
                    }]} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomBtn title="요리 추천"
                    textColor="#000"
                    borderRadius={4}
                    onPress={() => { }} />
                <CustomBtn title="편집"
                    textColor="#000"
                    borderRadius={4}
                    onPress={() => { }} />
            </View>
        </View>

    );
} const styles = StyleSheet.create({
    food: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
    },
    foodImg: {
        marginRight: 13,
        aspectRatio: 1,
        width: '11.5%',
    },
    foodText1: {
        flexDirection: 'column',
        flex: 1,
    },
    dday: {
        color: '#F50000',
        fontWeight: 'bold',
        // FIXME: 반응형 글자크기 생각 > 12 넘어가면 줄넘어감..
        fontSize: 12,
    },
    foodText2: {
        flexDirection: 'column',
        flex: 1.5,
        marginLeft: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginLeft: 22.5,
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
});
