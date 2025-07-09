import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

export default function InputBox({
    placeholder = "이메일을 입력해주세요",
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