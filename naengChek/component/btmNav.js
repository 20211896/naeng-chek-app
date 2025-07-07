import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomNavigation({ navigation }) {
    return (
        // TODO: 텍스트 아이콘으로 변경 및 onPress 이동 페이지 수정
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navIcon}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navIcon}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navIcon}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navIcon}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.navIcon}>5</Text>
            </TouchableOpacity>
        </View>
    );
} const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dadada',
        paddingVertical: 22,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    navIcon: {
        width: 36,
        height: 36,
        
        //HACK: 레이아웃 확인용
        backgroundColor: '#fff',
        //HACK: 아이콘으로 바꿀땐 지우기 - 텍스트 설정
        lineHeight: 36,
        textAlign: "center",
    }
});

