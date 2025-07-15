import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity, TextInput } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomBottomSheet from '../../component/customBottomSheet';

const screenHeight = Dimensions.get('window').height;

export default function UserPhone({ navigation, route }) {
    const { userName, birthDate } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [selectedCarrier, setSelectedCarrier] = useState('통신사');
    const [editableName, setEditableName] = useState(userName);
    const [editableBirthDate, setEditableBirthDate] = useState(birthDate);
    const carrierBottomSheetRef = useRef(null);

    const telecoms = ['SKT', 'KT', 'LGU+', '알뜰폰 SKT', '알뜰폰 KT', '알뜰폰 LGU+'];

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '');

        const limitedNumbers = numbers.slice(0, 11);

        if (limitedNumbers.length <= 3) {
            return limitedNumbers;
        } else if (limitedNumbers.length <= 7) {
            return limitedNumbers.replace(/(\d{3})(\d+)/, '$1-$2');
        } else {
            return limitedNumbers.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
        }
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

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        return phoneRegex.test(phone);
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

    const isValidName = (name) => {
        return name.trim().length >= 1;
    };

    const isValidCarrier = (carrier) => {
        return carrier !== '통신사';
    };

    const handlePhoneChange = (value) => {
        const formatted = formatPhoneNumber(value);
        if (formatted.length <= 13) {
            setPhoneNumber(formatted);
        }
    };

    const handleBirthDateChange = (value) => {
        const formatted = formatBirthDate(value);
        setEditableBirthDate(formatted);
    };

    const handleCarrierSelect = () => {
        carrierBottomSheetRef.current?.snapToIndex(0);
    };

    const closeBottomSheet = () => {
        carrierBottomSheetRef.current?.close();
    };

    const handleCarrierOption = (carrier) => {
        setSelectedCarrier(carrier);
        closeBottomSheet();
    };

    const handleNext = () => {
        if (!isValidName(editableName)) {
            Alert.alert('알림', '이름을 입력해 주세요.');
            return;
        }

        if (!isValidBirthDate(editableBirthDate)) {
            Alert.alert('알림', '올바른 생년월일을 입력해 주세요.');
            return;
        }

        if (!isValidCarrier(selectedCarrier)) {
            Alert.alert('알림', '통신사를 선택해 주세요.');
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            Alert.alert('알림', '올바른 전화번호를 입력해 주세요.');
            return;
        }

        const userData = {
            name: editableName.trim(),
            birthDate: editableBirthDate,
            carrier: selectedCarrier,
            phoneNumber: phoneNumber
        };

        console.log('완성된 사용자 데이터:', userData);

        navigation.navigate('UserIdentify', {
            userName: editableName.trim(),
            birthDate: birthDate,
            userPhoneNumber: phoneNumber,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    휴대폰 번호를{'\n'}입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>휴대폰 번호</Text>

                    <View style={styles.phoneInputContainer}>
                        <TouchableOpacity
                            style={styles.carrierButton}
                            onPress={handleCarrierSelect}
                        >
                            <Text style={styles.carrierButtonText}>
                                {selectedCarrier}
                            </Text>
                            <FontAwesome6
                                name="angle-down"
                                size={12}
                                color="#000"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="휴대폰 번호"
                            placeholderTextColor="#999"
                            value={phoneNumber}
                            onChangeText={handlePhoneChange}
                            keyboardType="phone-pad"
                            maxLength={13}
                            autoFocus={true}
                        />
                    </View>

                    {phoneNumber.length > 0 && !isValidPhoneNumber(phoneNumber) && (
                        <Text style={styles.errorText}>올바른 전화번호를 입력해 주세요</Text>
                    )}
                </View>
            </View>

            <View style={styles.previousDataContainer}>
                <View style={styles.dataDisplayContainer}>
                    <Text style={styles.dataLabel}>생년월일</Text>
                    <InputBox
                        value={editableBirthDate}
                        onChangeText={handleBirthDateChange}
                        placeholder="1990.01.01"
                        keyboardType="number-pad"
                        maxLength={10}
                    />
                    {editableBirthDate.length > 0 && !isValidBirthDate(editableBirthDate) && (
                        <Text style={styles.errorText}>올바른 생년월일을 입력해 주세요</Text>
                    )}
                </View>

                <View style={styles.dataDisplayContainer}>
                    <Text style={styles.dataLabel}>이름</Text>
                    <InputBox
                        value={editableName}
                        onChangeText={setEditableName}
                        placeholder="이름을 입력해 주세요"
                        maxLength={20}
                        autoCapitalize="words"
                    />
                    {editableName.length > 0 && !isValidName(editableName) && (
                        <Text style={styles.errorText}>이름을 입력해 주세요</Text>
                    )}
                </View>
            </View>

            <FullWidthBtn
                title="다음"
                style={[
                    styles.nextBox,
                    (!isValidName(editableName) || !isValidBirthDate(editableBirthDate) || !isValidCarrier(selectedCarrier) || !isValidPhoneNumber(phoneNumber)) && styles.disabledButton
                ]}
                onPress={handleNext}
            />

            <CustomBottomSheet
                ref={carrierBottomSheetRef}
                snapPoints={['60%']}
                enableDynamicSizing={true}
                onBackdropPress={() => carrierBottomSheetRef.current?.close()}
            >
                <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>통신사를 선택해 주세요</Text>
                        <TouchableOpacity
                            onPress={closeBottomSheet}
                            style={styles.closeButton}
                        >
                            <FontAwesome6 name="xmark" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                    {telecoms.map((carrier, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                index === telecoms.length - 1 && styles.lastOptionButton
                            ]}
                            onPress={() => handleCarrierOption(carrier)}
                        >
                            <Text style={[
                                styles.optionText,
                                { color: selectedCarrier === carrier ? '#000' : '#6E6E6E' }
                            ]}>
                                {carrier}
                            </Text>
                            {selectedCarrier === carrier && (
                                <View style={styles.checkIcon}>
                                    <FontAwesome6 name="check" size={16} color="black" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </CustomBottomSheet>
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
        marginBottom: 20,
        width: '100%',
    },
    inputContainer: {
        gap: 12,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cacaca',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        height: screenHeight * (50 / 812),
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        height: '100%',
    },
    carrierButton: {
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 8,
        borderRadius: 6,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        flexDirection: 'row',
        gap: 6,
    },
    carrierButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 4,
        marginLeft: 4,
    },
    previousDataContainer: {
        gap: 16,
        marginBottom: 20,
    },
    dataDisplayContainer: {
        gap: 8,
    },
    dataLabel: {
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
    bottomSheetContent: {
        padding: 20,
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    lastOptionButton: {
        borderBottomWidth: 0,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    },
    checkIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});