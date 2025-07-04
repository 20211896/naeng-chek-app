import React from 'react'; 
import { StyleSheet, View, Text } from 'react-native';
export default function MyPage({ navigation }) {
    return (
        <View>
            <Text>마이페이지</Text>
            <Text>프로필 정보</Text>
            <Text>설정</Text>
            <Text>로그아웃</Text>
        </View>
    );
} const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

