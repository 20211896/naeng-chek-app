import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function FilterBtn_1_2({ 
    title, 
    onPress, 
    fontSize = 12, 
    icon, 
    iconPosition = 'right', 
    /*
    // NOTE: 버튼 활성화 로직 -> 활성화시 색 변경 
    isActive = false,
    activeBackgroundColor = '#007AFF',
    inactiveBackgroundColor = '#dadada',
    activeTextColor = 'white',
    inactiveTextColor = 'black'
    */
}) {
    const dynamicPadding = {
        paddingHorizontal: fontSize * 0.8,
        paddingVertical: fontSize * 0.4,
    };

    /*
    // NOTE: 버튼 활성화 로직 -> 활성화시 색 변경 
    const buttonStyle = {
        backgroundColor: isActive ? activeBackgroundColor : inactiveBackgroundColor,
    };

    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const iconColor = isActive ? activeTextColor : inactiveTextColor;
    */

    const renderContent = () => {
        if (!icon) {
            return <Text style={[styles.text, { fontSize }]}>{title}</Text>;
        }

        const textElement = <Text style={[styles.text, { fontSize }]}>{title}</Text>;
        const iconElement = React.cloneElement(icon, {
            size: icon.props.size || fontSize + 4,
            color: icon.props.color || 'black',
        });

        if (iconPosition === 'left') {
            return (
                <View style={styles.contentContainer}>
                    {iconElement}
                    {textElement}
                </View>
            );
        } else {
            return (
                <View style={styles.contentContainer}>
                    {textElement}
                    {iconElement}
                </View>
            );
        }
    };

    return (
        <TouchableOpacity style={[styles.button, dynamicPadding]} onPress={onPress}>
            {renderContent()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#dadada',
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 400,
        color: 'black',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});