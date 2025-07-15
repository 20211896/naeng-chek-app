import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';
import FullWidthBtn from '../../component/btnStyle/fullWidthBtn';
import InputBox from '../../component/inputBox';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const screenHeight = Dimensions.get('window').height;

export default function UserIdentify({ navigation }) {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTextStyle}>
                        본인 인증을{'\n'}진행할게요
                    </Text>
                    <Text style={styles.headerExTextStyle}>
                        가입을 하시려면 본인 인증이 필요해요
                    </Text>
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.inputIcon}>
                    </View>
                </View>

            </View>

            <View style={styles.bottomSection}>
                <FullWidthBtn
                    title="본인인증 하러 가기"
                    style={styles.nextBox}
                    // TODO: 추후 pass sdk 연결
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    bottomSection: {
        paddingBottom: 40,
    },
    headerText: {
        marginTop: 156,
        marginBottom: 36,
        flexDirection: 'column'
    },
    headerTextStyle: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
    },
    headerExTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: "#999999",
        marginTop: 20,
    },
    inputBox:{
        marginTop: 100,
        alignItems: 'center',
    },
    inputIcon: {
        width: screenHeight * 0.187,
        aspectRatio: 1,
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        marginBottom: 20,
    },
    nextBox: {
        width: '100%',
    },
});