import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function UserData({ navigation }) {
    const [name, setName] = useState('');

    const isValidName = (name) => {
        return name.trim().length >= 1;
    };

    const clearInput = () => {
        setName('');
    };

    const handleNext = () => {
        if (!isValidName(name)) {
            Alert.alert('알림', '이름을 입력해 주세요.');
            return;
        }

        navigation.navigate('UserBirthDate', { userName: name.trim() });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    이름을{'\n'}입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <InputBox
                            placeholder="이름을 입력해 주세요"
                            value={name}
                            onChangeText={setName}
                            maxLength={10}
                            autoFocus={true}
                        />
                        {name.length > 0 && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={clearInput}
                            >
                                <FontAwesome6
                                    name="circle-xmark"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            <FullWidthBtn
                title="다음"
                style={[
                    styles.nextBox,
                    !isValidName(name) && styles.disabledButton
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
    clearButton: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: -10 }],
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    nextBox: {
        marginBottom: 32,
        width: '100%',
    },
    disabledButton: {
        opacity: 0.5,
    },
});