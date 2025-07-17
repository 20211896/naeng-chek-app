import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FloatingButton({
    onAddPress,
    onClosePress,
    onPhotoPress,
    onManualPress,
    onImageSelected,
    onOCRStart,
    size = 48,
    backgroundColor = '#575757',
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

    const openGallery = async () => {
        try {
            const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (mediaPermission.status !== 'granted') {
                Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const imageInfo = {
                    uri: imageUri,
                    width: result.assets[0].width,
                    height: result.assets[0].height,
                    fileSize: result.assets[0].fileSize,
                    type: result.assets[0].type,
                    fileName: result.assets[0].fileName || `image_${Date.now()}.jpg`,
                };
                
                onOCRStart && onOCRStart(imageInfo);
                onImageSelected && onImageSelected(imageUri);
            }
        } catch (error) {
            console.error('Gallery Error: ', error);
            Alert.alert('오류', '갤러리를 실행할 수 없습니다.');
        }
    };

    // HACK: 앨범 버튼 추가 불가능 -> 카메라 종료시 앨범 열기
    const openCameraWithGallery = async () => {
        try {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            
            if (cameraPermission.status !== 'granted') {
                Alert.alert('권한 필요', '카메라 권한이 필요합니다.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const imageInfo = {
                    uri: imageUri,
                    width: result.assets[0].width,
                    height: result.assets[0].height,
                    fileSize: result.assets[0].fileSize,
                    type: result.assets[0].type,
                    fileName: result.assets[0].fileName || `image_${Date.now()}.jpg`,
                    source: 'camera'
                };
                
                // NOTE: OCR 로딩 페이지로 이동
                onOCRStart && onOCRStart(imageInfo);
                onImageSelected && onImageSelected(imageUri);
            } else if (result.canceled) {
                // NOTE: 카메라에서 취소했을 때 갤러리 옵션 제공
                Alert.alert(
                    '갤러리에서 선택',
                    '갤러리에서 사진을 선택하시겠습니까?',
                    [
                        { text: '예', onPress: openGallery },
                        { text: '아니오', style: 'cancel' },
                    ]
                );
            }
        } catch (error) {
            console.error('Camera Error: ', error);
            Alert.alert('오류', '카메라를 실행할 수 없습니다.');
        }
    };

    return (
        <>
            {isExpanded && <View style={styles.overlay} />}

            <View style={styles.container}>
                {isExpanded && (
                    <View style={styles.expandedView}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                onPhotoPress && onPhotoPress();
                                setIsExpanded(false);
                                openCameraWithGallery();
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