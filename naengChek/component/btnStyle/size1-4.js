import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Btn_1_4({ title, onPress, fontSize = 12 }) {
    const dynamicPadding = {
        paddingHorizontal: fontSize * 0.3,
        paddingVertical: fontSize,
    };

    return (
        <TouchableOpacity style={[styles.button, dynamicPadding]} onPress={onPress}>
            <Text style={[styles.text, { fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#dadada',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 400,
    },
});