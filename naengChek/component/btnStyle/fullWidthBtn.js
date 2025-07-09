import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

export default function FullWidthBtn({ title, onPress, fontSize = 16, backgroundColor = '#707070', style}) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress}>
            <Text style={[styles.text, { fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: screenHeight * (50 / 812),
        borderRadius: 12,
    },
    text: {
        fontWeight: '400',
        color: '#fff'
    },
});