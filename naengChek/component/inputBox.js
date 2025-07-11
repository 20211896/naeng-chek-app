import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

/*NOTE: InputBox 컴포넌트 프롭 설명
 * placeholder - 입력 필드에 표시될 안내 텍스트 (기본값: "")
 * value - 입력 필드의 현재 값
 * onChangeText - 텍스트 변경 시 실행될 함수
 * fontSize - 텍스트 크기 (기본값: 18)
 * backgroundColor - 입력 필드 배경 색상 (기본값: '#f5f5f5')
 * borderColor - 테두리 색상 (기본값: '#cacaca')
 * textColor - 텍스트 색상 (기본값: '#000')
 * keyboardType - 키보드 타입 (기본값: 'email-address')
 * secureTextEntry - 비밀번호 입력 모드 여부 (기본값: false)
 * editable - 편집 가능 여부 (기본값: true)
 * maxLength - 최대 입력 가능한 문자 수
 * ...props - 추가 TextInput 프롭들
 */
export default function InputBox({
    placeholder = "",
    value,
    onChangeText,
    fontSize = 18,
    backgroundColor = '#f5f5f5',
    borderColor = '#cacaca',
    textColor = '#000',
    keyboardType = 'email-address',
    secureTextEntry = false,
    editable = true,
    maxLength,
    ...props
}) {
    return (
        <TextInput
            style={[
                styles.input,
                {
                    fontSize,
                    backgroundColor,
                    borderColor,
                    color: textColor,
                    height: screenHeight * (50 / 812),
                }
            ]}
            placeholder={placeholder}
            placeholderTextColor="#cacaca"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            editable={editable}
            maxLength={maxLength}
            {...props}
        />
    );
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        fontWeight: '400',
    },
});