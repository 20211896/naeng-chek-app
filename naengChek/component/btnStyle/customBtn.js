import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

/*NOTE: CustomBtn 컴포넌트 프롭 설명
 * @param {string} title - 버튼에 표시될 텍스트
 * @param {function} onPress - 버튼 클릭 시 실행될 함수
 * @param {number} [fontSize=12] - 텍스트 크기
 * @param {ReactElement} [icon=null] - 버튼에 표시될 아이콘 (React Element)
 * @param {string} [iconPosition='right'] - 아이콘 위치 ('left' 또는 'right')
 * @param {number} [paddingXFactor=1] - 가로 패딩 배수 (fontSize * paddingXFactor)
 * @param {number} [paddingYFactor=0.5] - 세로 패딩 배수 (fontSize * paddingYFactor)
 * @param {string} [textColor='black'] - 기본 텍스트 색상
 * @param {string} [backgroundColor='#dadada'] - 기본 배경 색상
 * @param {number} [borderRadius=12] - 버튼 모서리 둥글기
 * @param {object} [pressedStyle=null] - 버튼 눌렸을 때 적용될 스타일 객체
 * @param {string} [pressedTextColor=null] - 버튼 눌렸을 때 텍스트 색상
 */
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
    pressedStyle = null,
    pressedTextColor = null,
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
                isPressed && pressedStyle
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
        borderWidth: 0,
    },
    text: {
        fontWeight: '400',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});