import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';
import CustomBottomSheet from '../../component/customBottomSheet';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

const screenHeight = Dimensions.get('window').height;

export default function UserPw({ navigation, route }) {
    // TODO: 사용자 데이터 db저장로직 생성 - api통신, HTTPS 접근허용
    // TODO: 개인정보 암호화, 비밀번호 해시화 로직 백엔드 필요

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const bottomSheetRef = useRef(null);
    const [isAllChecked, setAllChecked] = useState(false);

    // NOTE: 개별 약관 체크 상태
    const [termsState, setTermsState] = useState({
        service: false,      // NOTE: 이용약관
        privacy: false,      // NOTE: 개인정보처리방침
        marketing: false,    // NOTE: 마케팅 정보 수신
        location: false,     // NOTE: 위치정보 이용
        push: false          // NOTE: 푸시 알림
    });

    // NOTE: 약관 데이터
    const termsData = [
        { key: 'service', text: '[필수] 서비스 이용약관 동의', required: true },
        { key: 'privacy', text: '[필수] 개인정보 수집*이용 동의서', required: true },
        { key: 'marketing', text: '[필수] 만 14세 이상 동의서', required: true },
        { key: 'location', text: '[선택]마케팅 정보 수신 동의', required: false },
        { key: 'push', text: '[선택]푸시 알림 수신 동의', required: false }
    ];

    const hasRepeatedChars = (password) => {
        return /(.)\1{2,}/.test(password);
    };

    const isValidLength = (password) => {
        return password.length >= 8 && password.length <= 20;
    };

    const hasNumberOrSpecial = (password) => {
        return /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    };

    const isPasswordMatch = () => {
        return password === confirmPassword && confirmPassword.length > 0;
    };

    const isPasswordFormValid = () => {
        return (
            !hasRepeatedChars(password) &&
            isValidLength(password) &&
            hasNumberOrSpecial(password) &&
            isPasswordMatch()
        );
    };

    useEffect(() => {
        const allChecked = Object.values(termsState).every(checked => checked);
        setAllChecked(allChecked);
    }, [termsState]);

    const handleAllCheck = () => {
        const newState = !isAllChecked;
        setAllChecked(newState);

        const newTermsState = {};
        termsData.forEach(term => {
            newTermsState[term.key] = newState;
        });
        setTermsState(newTermsState);
    };

    const handleTermCheck = (key) => {
        setTermsState(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const isRequiredTermsChecked = () => {
        return termsData
            .filter(term => term.required)
            .every(term => termsState[term.key]);
    };

    const handleNext = () => {
        if (!isPasswordFormValid()) {
            Alert.alert('알림', '비밀번호 조건을 확인해 주세요.');
            return;
        }

        bottomSheetRef.current?.snapToIndex(0);
    };

    const handleTermsComplete = () => {
        if (!isRequiredTermsChecked()) {
            Alert.alert('알림', '필수 약관에 동의해 주세요.');
            return;
        }

        bottomSheetRef.current?.close();
        navigation.navigate('Home');
    };

    const handleBackdropPress = () => {
        bottomSheetRef.current?.close();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerTextStyle}>
                    로그인에 사용할{'\n'}비밀번호를 입력해 주세요
                </Text>
            </View>

            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>비밀번호</Text>
                    <InputBox
                        placeholder="비밀번호 입력"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        keyboardType="default"
                        autoFocus={true}
                    />
                    <View style={styles.validationContainer}>
                        {password.length > 0 && hasRepeatedChars(password) && (
                            <View style={styles.errorValidationItem}>
                                <Feather
                                    name="info"
                                    size={11}
                                    color="#FF3B30"
                                />
                                <Text style={styles.errorValidationText}>동일한 문자가 3회 이상 반복되었어요</Text>
                            </View>
                        )}

                        <View style={styles.validationRow}>
                            <View style={styles.validationItem}>
                                <Feather
                                    name={isValidLength(password) ? "check" : "info"}
                                    size={11}
                                    color={isValidLength(password) ? "#00C851" : "#909090"}
                                />
                                <Text style={[
                                    styles.validationText,
                                    { color: isValidLength(password) ? "#00C851" : "#909090" }
                                ]}>8~20자 이내</Text>
                            </View>
                            <View style={styles.validationItem}>
                                <Feather
                                    name={hasNumberOrSpecial(password) ? "check" : "info"}
                                    size={11}
                                    color={hasNumberOrSpecial(password) ? "#00C851" : "#909090"}
                                />
                                <Text style={[
                                    styles.validationText,
                                    { color: hasNumberOrSpecial(password) ? "#00C851" : "#909090" }
                                ]}>숫자, 특수문자 중 1가지 포함</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>비밀번호 확인</Text>
                    <InputBox
                        placeholder="비밀번호 다시 입력"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                        keyboardType="default"
                    />
                    {confirmPassword.length > 0 && (
                        <View style={styles.validationItem}>
                            <Feather
                                name={isPasswordMatch() ? "check" : "info"}
                                size={11}
                                color={isPasswordMatch() ? "#00C851" : "#FF3B30"}
                            />
                            <Text style={[
                                styles.validationText,
                                { color: isPasswordMatch() ? "#00C851" : "#FF3B30" }
                            ]}>
                                {isPasswordMatch() ? "비밀번호 일치" : "비밀번호 불일치"}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <FullWidthBtn
                title="다음"
                style={[
                    styles.nextBox,
                    !isPasswordFormValid() && styles.disabledButton
                ]}
                onPress={handleNext}
            />

            <CustomBottomSheet
                ref={bottomSheetRef}
                snapPoints={["80%"]}
                enableDynamicSizing={true}
                onBackdropPress={handleBackdropPress}
            >
                <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>
                            냉췍 이용을 위해{'\n'}약관에 동의해 주세요
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleBackdropPress}
                        >
                            <AntDesign name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.termsContainer}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={handleAllCheck}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isAllChecked }}
                            accessibilityLabel="모든 약관에 동의하기"
                        >
                            <Checkbox
                                style={styles.checkbox}
                                value={isAllChecked}
                                onValueChange={handleAllCheck}
                                color={isAllChecked ? '#000' : undefined}
                            />
                            <Text style={styles.checkboxText}>
                                모두 동의하기
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.termsList}>
                            {termsData.map((term, index) => (
                                <View key={term.key} style={styles.termItemContainer}>
                                    <TouchableOpacity
                                        style={styles.termItem}
                                        onPress={() => handleTermCheck(term.key)}
                                        accessibilityRole="checkbox"
                                        accessibilityState={{ checked: termsState[term.key] }}
                                        accessibilityLabel={term.text}
                                    >
                                        <View importantForAccessibility="no-hide-descendants">
                                            <AntDesign
                                                name={termsState[term.key] ? "checkcircle" : "checkcircleo"}
                                                size={20}
                                                color={termsState[term.key] ? "#000" : "#ccc"}
                                                importantForAccessibility="no"
                                            />
                                        </View>
                                        <Text style={styles.termText}>{term.text}</Text>
                                    </TouchableOpacity>
                                    {/* TODO: 각 법률조항 상세보기 연결*/}
                                    <TouchableOpacity
                                        onPress={() => console.log(`${term.text} 상세보기`)}
                                        accessibilityRole="button"
                                        accessibilityLabel={`${term.text} 상세보기`}
                                    >
                                        <View importantForAccessibility="no-hide-descendants">
                                            <AntDesign
                                                name="right"
                                                size={16}
                                                color="#999"
                                                importantForAccessibility="no"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.bottomSheetFooter}>
                        <FullWidthBtn
                            title="동의하고 시작하기"
                            style={[
                                styles.termsNextButton,
                                !isRequiredTermsChecked() && styles.disabledButton
                            ]}
                            onPress={handleTermsComplete}
                        />
                    </View>
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
        gap: 24,
        marginBottom: 20,
        width: '100%',
    },
    inputContainer: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 15,
        color: "#7c7c7c"
    },
    validationContainer: {
        gap: 8,
        marginTop: 8,
    },
    validationRow: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flex: 1,
        minWidth: 150,
    },
    errorValidationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    validationText: {
        fontSize: 12,
        fontWeight: '400',
    },
    errorValidationText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FF3B30',
    },
    nextBox: {
        marginBottom: 32,
        width: '100%',
    },
    disabledButton: {
        opacity: 0.5,
    },
    // 바텀시트 스타일
    bottomSheetContent: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        flex: 1,
    },
    closeButton: {
        padding: 4,
        marginLeft: 10,
    },
    termsScrollView: {
        flex: 1,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    checkboxText: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    termsList: {
        gap: 16,
        paddingHorizontal: 8,
    },
    termItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    termItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
        paddingVertical: 8,
    },
    termText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    bottomSheetFooter: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    termsNextButton: {
        width: '100%',
    },
});