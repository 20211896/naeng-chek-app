import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import FullWidthBtn from '../component/btnStyle/fullWidthBtn';
import CustomBtn from '../component/btnStyle/customBtn';
import InputBox from '../component/inputBox';

const screenHeight = Dimensions.get('window').height;

export default function IdFind({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    아이디를 찾기 위해{'\n'}정보를 입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <InputBox placeholder="이름" />
                <InputBox placeholder="010-1234-5678" />
            </View>
            <FullWidthBtn title="다음" style={styles.loginBox} onPress={() => { navigation.navigate('Home') }} />


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    headerText: {
        marginTop: 156,
        marginBottom: 36,
    },
    headerTextStyle: {
        fontSize: 24,
        fontWeight: '550',
        lineHeight: 32,
    },
    inputBox: {
        gap: 12,
        marginBottom: 24,
        width: '100%',
    },
    loginBox: {
        marginBottom: 32,
        width: '100%',
    },
});
