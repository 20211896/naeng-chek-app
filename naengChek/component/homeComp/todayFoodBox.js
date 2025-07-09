import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomBtn from '../btnStyle/customBtn';

export default function TodayFoodBox({ navigation }) {
    return (
        <View style={styles.food}>
            <Image style={styles.foodImg} source={{ uri: 'https://picsum.photos/80/80' }} />

            <View style={styles.foodText}>
                <Text>요리명</Text>
                <View style={styles.ingredients}>
                    <CustomBtn
                        title="재료"
                        fontSize={10}
                        onPress={() => { }}
                        paddingXFactor={1}
                        paddingYFactor={0.3}
                        borderRadius={4}
                        textColor="black"
                    />
                    <CustomBtn
                        title="재료"
                        fontSize={10}
                        onPress={() => { }}
                        paddingXFactor={1}
                        paddingYFactor={0.3}
                        borderRadius={4}
                        textColor="black"
                    />
                </View>
                <Text>설명</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    food: {
        paddingHorizontal: 16,
        paddingVertical: 19,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 5,
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