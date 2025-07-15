import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';


export default function UserEmail({ navigation, route }) {
    const [email, setEmail] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleNext = () => {
        if (!isValidEmail(email)) {
            Alert.alert('알림', '올바른 이메일 주소를 입력해 주세요.');
            return;
        }

        navigation.navigate('UserPw', {
            ...route.params,
            userEmail: email.trim(),
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    로그인에 사용할{'\n'}이메일을 입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <InputBox
                            placeholder="abc@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoFocus={true}
                        />
                    </View>
                    {email.length > 0 && !isValidEmail(email) && (
                        <Text style={styles.errorText}>올바른 이메일 주소를 입력해 주세요</Text>
                    )}
                </View>
            </View>

            <FullWidthBtn
                title="다음"
                style={[
                    styles.nextBox,
                    !isValidEmail(email) && styles.disabledButton
                ]}
                onPress={handleNext}
            />
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
        fontWeight: '600',
        lineHeight: 32,
    },
    inputBox: {
        gap: 24,
        marginBottom: 40,
        width: '100%',
    },
    inputContainer: {
        gap: 8,
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 4,
        marginLeft: 4,
    },
    nextBox: {
        marginBottom: 32,
        width: '100%',
    },
    disabledButton: {
        opacity: 0.5,
    },
});