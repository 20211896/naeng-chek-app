import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function CustomBtn({
    title,
    onPress,
    fontSize = 12,
    icon = null,
    iconPosition = 'right',
    paddingXFactor = 1,
    paddingYFactor = 0.5,
    textColor = 'black',
    backgroundColor = '#dadada',
    borderRadius = 12,
    pressedStyle = null, // 새로 추가된 prop
    pressedTextColor = null, // 눌렸을 때 텍스트 색상
}) {
    const [isPressed, setIsPressed] = useState(false);

    const dynamicPadding = {
        paddingHorizontal: fontSize * paddingXFactor,
        paddingVertical: fontSize * paddingYFactor,
    };

    const renderContent = () => {
        const currentTextColor = isPressed && pressedTextColor ? pressedTextColor : textColor;
        
        if (!icon) {
            return <Text style={[styles.text, { fontSize, color: currentTextColor }]}>{title}</Text>;
        }

        const textElement = <Text style={[styles.text, { fontSize, color: currentTextColor }]}>{title}</Text>;
        const iconElement = React.cloneElement(icon, {
            size: icon.props.size || fontSize + 4,
            color: icon.props.color || currentTextColor,
        });

        return (
            <View style={[styles.contentContainer, iconPosition === 'left' && { flexDirection: 'row-reverse' }]}>
                {textElement}
                <View style={{ width: 8 }} />
                {iconElement}
            </View>
        );
    };

    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { backgroundColor },
                dynamicPadding, 
                { borderRadius },
                isPressed && pressedStyle // pressedStyle이 있을 때만 적용
            ]} 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
        >
            {renderContent()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0, // 테두리 제거
    },
    text: {
        fontWeight: '400',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});