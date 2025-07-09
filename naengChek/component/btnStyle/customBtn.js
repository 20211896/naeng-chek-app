import React from 'react';
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
    borderRadius = 12,
}) {
    const dynamicPadding = {
        paddingHorizontal: fontSize * paddingXFactor,
        paddingVertical: fontSize * paddingYFactor,
    };

    const renderContent = () => {
        if (!icon) {
            return <Text style={[styles.text, { fontSize, color: textColor }]}>{title}</Text>;
        }

        const textElement = <Text style={[styles.text, { fontSize, color: textColor }]}>{title}</Text>;
        const iconElement = React.cloneElement(icon, {
            size: icon.props.size || fontSize + 4,
            color: icon.props.color || textColor,
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
        <TouchableOpacity style={[styles.button, dynamicPadding, { borderRadius }]} onPress={onPress}>
            {renderContent()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#dadada',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '400',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});