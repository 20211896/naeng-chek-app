import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';
import Feather from '@expo/vector-icons/Feather';

const screenHeight = Dimensions.get('window').height;

export default function UserBirthDate({ navigation, route }) {

    const { userName } = route.params;
    const [birthDate, setBirthDate] = useState('');
    const [editableName, setEditableName] = useState(userName);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(1990, 0, 1));

    const formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const formatBirthDate = (value) => {
        const numbers = value.replace(/\D/g, '');
        const limitedNumbers = numbers.slice(0, 8);

        if (limitedNumbers.length <= 4) {
            return limitedNumbers;
        } else if (limitedNumbers.length <= 6) {
            return limitedNumbers.replace(/(\d{4})(\d+)/, '$1.$2');
        } else {
            return limitedNumbers.replace(/(\d{4})(\d{2})(\d+)/, '$1.$2.$3');
        }
    };

    const handleBirthDateChange = (value) => {
        const formatted = formatBirthDate(value);
        setBirthDate(formatted);
    };

    const isValidBirthDate = (birthDate) => {
        const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
        if (!dateRegex.test(birthDate)) return false;

        const [year, month, day] = birthDate.split('.').map(Number);
        const date = new Date(year, month - 1, day);

        if (date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day) {
            return false;
        }

        const today = new Date();
        if (date > today) return false;

        if (year < 1900) return false;

        return true;
    };

    const calculateAge = (birthDate) => {
        if (!isValidBirthDate(birthDate)) return null;

        const [year, month, day] = birthDate.split('.').map(Number);
        const birthDateObj = new Date(year, month - 1, day);
        const today = new Date();

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const isValidName = (name) => {
        return name.trim().length >= 1;
    };

    const onDateChange = (event, date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (event.type === 'set' && date) {
            setSelectedDate(date);
            const formattedDate = formatDateToString(date);
            setBirthDate(formattedDate);
        }

        if (event.type === 'dismissed') {
            setShowDatePicker(false);
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    const handleNext = () => {
        if (!isValidName(editableName)) {
            Alert.alert('알림', '이름을 입력해 주세요.');
            return;
        }

        if (!isValidBirthDate(birthDate)) {
            Alert.alert('알림', '올바른 생년월일을 입력해 주세요.\n(예: 1990.01.01)');
            return;
        }

        const age = calculateAge(birthDate);

        if (age < 14) {
            Alert.alert('알림', '만 14세 이상만 가입할 수 있습니다.');
            return;
        }

        const userData = {
            name: editableName.trim(),
            birthDate: birthDate,
            age: age
        };

        console.log('완성된 사용자 데이터:', userData);

        navigation.navigate('UserPhone', {
            userName: editableName.trim(),
            birthDate: birthDate,
        });
    };

    const age = calculateAge(birthDate);

    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    생년월일을{'\n'}입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWithButton}>
                        <InputBox
                            placeholder="1990.01.01"
                            value={birthDate}
                            onChangeText={handleBirthDateChange}
                            keyboardType="number-pad"
                            maxLength={10}
                            autoFocus={true}
                        />
                        <TouchableOpacity
                            style={styles.calendarButton}
                            onPress={showDatePickerModal}
                        >
                            <Feather name="calendar" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    {birthDate.length > 0 && !isValidBirthDate(birthDate) && (
                        <Text style={styles.errorText}>올바른 생년월일을 입력해 주세요 (예: 1990.01.01)</Text>
                    )}
                    {age !== null && age < 14 && (
                        <Text style={styles.errorText}>만 14세 이상만 가입할 수 있습니다</Text>
                    )}
                </View>
            </View>

            <View style={styles.nameDisplayContainer}>
                <Text style={styles.nameLabel}>이름</Text>
                <InputBox
                    value={editableName}
                    onChangeText={setEditableName}
                    placeholder="이름을 입력해 주세요"
                    keyboardType="default"
                    maxLength={20}
                    autoCapitalize="words"
                />
                {editableName.length > 0 && !isValidName(editableName) && (
                    <Text style={styles.errorText}>이름을 입력해 주세요</Text>
                )}
            </View>

            {/* NOTE: iOS에서는 모달 형태로, Android에서는 조건부 렌더링 */}
            {Platform.OS === 'ios' ? (
                showDatePicker && (
                    <View style={styles.datePickerContainer}>
                        <View style={styles.datePickerHeader}>
                            <TouchableOpacity onPress={hideDatePicker}>
                                <Text style={styles.datePickerButton}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={hideDatePicker}>
                                <Text style={[styles.datePickerButton, styles.confirmButton]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            onChange={onDateChange}
                            maximumDate={new Date()}
                            minimumDate={new Date(1900, 0, 1)}
                            style={styles.datePicker}
                        />
                    </View>
                )
            ) : (
                showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1900, 0, 1)}
                    />
                )
            )}

            <FullWidthBtn
                title="다음"
                style={[
                    styles.nextBox,
                    (!isValidName(editableName) || !isValidBirthDate(birthDate) || (age !== null && age < 14)) && styles.disabledButton
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
    nameText: {
        color: '#000',
        fontWeight: '700',
    },
    inputBox: {
        gap: 24,
        marginBottom: 20,
        width: '100%',
    },
    inputContainer: {
        gap: 8,
    },
    inputWithButton: {
        position: 'relative',
    },
    calendarButton: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        zIndex: 1,
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 4,
        marginLeft: 4,
    },
    nameDisplayContainer: {
        marginBottom: 20,
        gap: 8,
    },
    nameLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    nextBox: {
        marginBottom: 32,
        width: '100%',
    },
    disabledButton: {
        opacity: 0.5,
    },
    // NOTE: DateTimePicker 스타일 - iOS
    datePickerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 20,
        zIndex: 1000,
    },
    datePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    datePickerButton: {
        fontSize: 16,
        color: '#007AFF',
    },
    confirmButton: {
        fontWeight: '600',
    },
    datePicker: {
        backgroundColor: 'white',
    },
});