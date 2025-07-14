import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FullWidthBtn from '../component/btnStyle/fullWidthBtn';
import CustomBtn from '../component/btnStyle/customBtn';
import InputBox from '../component/inputBox';

const screenHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerLogo}></View>

            <View style={styles.inputBox}>
                <InputBox placeholder="아이디를 입력해 주세요"/>
                <InputBox placeholder="비밀번호를 입력해 주세요"/>
            </View>
            <FullWidthBtn title="로그인" style={styles.loginBox} onPress={() => {navigation.navigate('Home')}}/>
            <View style={styles.textBox}>
                <TouchableOpacity onPress={() => { }}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('IdFind')}}>
                    <Text>아이디 찾기</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text>비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>

            
            <View style={styles.divider} />

            <View style={styles.bottomBox}>
                <Text style={styles.bottomText}>소셜 로그인</Text>
                <View style={styles.bottomBtnBox}>
                    <CustomBtn
                        title="카카오"
                        onPress={() => { }}
                        fontSize={18}
                        paddingXFactor={0.9}
                        paddingYFactor={0.9}
                        textColor="#fff"
                        backgroundColor="#FEE500"
                    />
                    <CustomBtn
                        title="네이버"
                        onPress={() => { }}
                        fontSize={18}
                        paddingXFactor={0.9}
                        paddingYFactor={0.9}
                        textColor="#fff"
                        backgroundColor="#03C75A"
                    />
                    <CustomBtn
                        title="구 글"
                        onPress={() => { }}
                        fontSize={18}
                        paddingXFactor={0.9}
                        paddingYFactor={0.9}
                        textColor="#fff"
                        backgroundColor="#4285F4"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    headerLogo: {
        marginTop: 120,
        marginBottom: 33,
        height: screenHeight * (74 / 812),
        aspectRatio: 1,

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada",
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
    textBox: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e4e4e4',
        marginVertical: 40,
    },
    bottomBox: {
        alignItems: 'center'
    },
    bottomText: {
        fontSize: 18,
        fontWeight: '550',
        marginBottom: 15,
    },
    bottomBtnBox: {
        flexDirection: 'row',
        gap: 9,
    },
});