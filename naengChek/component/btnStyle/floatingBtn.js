import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function FloatingButton({
    onAddPress,
    onClosePress,
    onPhotoPress,
    onManualPress,
    size = 48,
    backgroundColor = '#575757', // 기본 버튼 색상 변경
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePress = () => {
        if (isExpanded) {
            onClosePress && onClosePress();
        } else {
            onAddPress && onAddPress();
        }
        setIsExpanded(!isExpanded);
    };

    const buttonStyle = {
        width: isExpanded ? size : 120,
        height: size,
        borderRadius: size / 2,
        backgroundColor: isExpanded ? 'white' : backgroundColor,
        flexDirection: 'row',
        paddingHorizontal: isExpanded ? 0 : 12,
    };

    return (
        <>
            {isExpanded && <View style={styles.overlay} />}
            
            <View style={styles.container}>
                {/* 
                    NOTE: 활성화될 때 나타나는 뷰 
                    TODO: 추가 뷰 버튼 onPress 각각 페이지 이동 구현 필요
                */}
                {isExpanded && (
                    <View style={styles.expandedView}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                onPhotoPress && onPhotoPress();
                                setIsExpanded(false);
                            }}
                        >
                            <View style={styles.optionIcon}></View>
                            <Text style={styles.optionText}>사진으로 추가</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, styles.lastOption]}
                            onPress={() => {
                                onManualPress && onManualPress();
                                setIsExpanded(false);
                            }}
                        >
                            <View style={styles.optionIcon}></View>
                            <Text style={styles.optionText}>직접 입력</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity
                    style={[styles.floatingButton, buttonStyle]}
                    onPress={handlePress}
                >
                    <Text style={[styles.buttonText, { color: isExpanded ? 'black' : 'white' }]}>
                        {isExpanded ? '✕' : '+ 식재료 추가'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#4d4d4d',
        opacity: 0.8,
        zIndex: 999,
    },
    container: {
        position: 'absolute',
        bottom: 100,
        right: 18,
        zIndex: 1000,
        alignItems: 'flex-end',
    },
    expandedView: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        marginBottom: 12,
        minWidth: 150,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    lastOption: {
        borderBottomWidth: 0,
    },
    optionIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#dadada',
        borderRadius: 4,
        marginRight: 10,
    },
    optionText: {
        fontSize: 14,
        color: 'black',
    },
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});