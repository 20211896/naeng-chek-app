import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import BtmNav from '../component/btmNav';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.homeHeader}>
                <Text style={styles.headerIcon}>로고</Text>
                <Text style={styles.headerIcon}>알림</Text>
            </View>

            <ScrollView>
                <View><Text>배너</Text></View>
                <View><Text>피드백형 알람 메시지</Text></View>
                <View><Text>오늘의 추천 요리</Text></View>
                <View><Text>나의식재료현황</Text></View>
            </ScrollView>

            <BtmNav navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeHeader: {
        marginTop: 66,
        marginBottom: 27,
        height: '4.43%',
        paddingHorizontal: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada"
    },
    headerIcon: {
        width: 36,
        height: 36,
        //HACK : 아이콘으로 바꿀땐 지우기 - 텍스트 설정용
        lineHeight: 36,
        textAlign:"center",
    }
});
