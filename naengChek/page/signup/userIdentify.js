import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';

const screenHeight = Dimensions.get('window').height;

export default function UserIdentify({ navigation, route}) {
    
    // TODO: 추후 PASS 인증을 먼저 onPress로 연결후, 인증결과 성공 받으면 사용자 데이터 그대로 넘김
    const handlePassSuccess = () => {
    navigation.navigate('UserEmail', {
        ...route.params,
    });
};

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTextStyle}>
                        본인 인증을{'\n'}진행할게요
                    </Text>
                    <Text style={styles.headerExTextStyle}>
                        가입을 하시려면 본인 인증이 필요해요
                    </Text>
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.inputIcon}>
                    </View>
                </View>

            </View>

            <View style={styles.bottomSection}>
                <FullWidthBtn
                    title="본인인증 하러 가기"
                    style={styles.nextBox}
                    // TODO: 추후 pass sdk 연결
                    onPress={handlePassSuccess}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    bottomSection: {
        paddingBottom: 40,
    },
    headerText: {
        marginTop: 156,
        marginBottom: 36,
        flexDirection: 'column'
    },
    headerTextStyle: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
    },
    headerExTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: "#999999",
        marginTop: 20,
    },
    inputBox:{
        marginTop: 100,
        alignItems: 'center',
    },
    inputIcon: {
        width: screenHeight * 0.187,
        aspectRatio: 1,
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        marginBottom: 20,
    },
    nextBox: {
        width: '100%',
    },
});