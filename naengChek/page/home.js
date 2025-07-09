import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Dimensions } from 'react-native';
import BtmNav from '../component/btmNav';
import TodayFoodBox from '../component/homeComp/todayFoodBox';
import MyFoodBox from '../component/homeComp/myFoodBox';
import CustomBtn from '../component/btnStyle/customBtn';

const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
    // TODO: 데이터 연결 및 필터/편집등 버튼 로직 구현 필요
    return (
        <View style={styles.container}>
            <View style={styles.homeHeader}>
                <Text style={styles.headerIcon}>로고</Text>
                <Text style={styles.headerIcon}>알림</Text>
            </View>

            <ScrollView style={styles.scrollStyle}>
                <View style={styles.homeBanner}><Text>배너</Text></View>

                <View style={styles.alarmMsg}><Text>피드백형 알람 메시지</Text></View>

                <View style={styles.todayFood}>
                    <Text style={styles.todayFoodText}>오늘의 추천 요리</Text>
                    <View style={styles.foodTable}>
                        <TodayFoodBox />
                        <TodayFoodBox />
                        <TodayFoodBox />
                    </View>
                </View>

                <View style={styles.myFood}>
                    <Text style={styles.myFoodText}>나의 식재료 현황</Text>

                    <View style={styles.filterTable}>
                        <View style={styles.filterRight}>
                            <CustomBtn
                                title="전체 식재료 편집"
                                onPress={() => { }}
                                paddingXFactor={1}
                                paddingYFactor={0.3}
                                borderRadius={4}
                                textColor="black"
                            />
                        </View>
                        <View style={styles.filterLeft}>
                            <CustomBtn
                                title="유통기한 필터"
                                onPress={() => { }}
                                paddingXFactor={1}
                                paddingYFactor={0.3}
                                borderRadius={4}
                                textColor="black"
                            />
                        </View>
                    </View>

                    <View style={styles.myFoodTable}>
                        <MyFoodBox />
                        <MyFoodBox />
                        <MyFoodBox />
                        <MyFoodBox />
                    </View>
                </View>

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
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '4.43%',

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada"
    },
    headerIcon: {
        width: 36,
        height: 36,

        //HACK : 아이콘으로 바꿀땐 지우기 - 텍스트 설정용
        lineHeight: 36,
        textAlign: "center",
    },

    scrollStyle: {
        flex: 1,
        paddingHorizontal: 24,
    },
    homeBanner: {
        marginBottom: 34,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight * 0.1355,

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada",
    },
    alarmMsg: {
        marginBottom: 50,
        height: screenHeight * 0.085,

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada",
        alignItems: 'center',
        justifyContent: 'center'
    },

    todayFood: {
        marginBottom: 9,
        paddingHorizontal: 4,
        flexDirection: 'column',

        //HACK : 레이아웃 확인용
        borderWidth: 1,
        borderColor: '#000000',
    },
    todayFoodText: {
        fontSize: 18,
    },
    foodTable: {
        padding: 18,
        gap: 12,
    },

    myFood: {
        marginBottom: 34,
        paddingHorizontal: 4,
        flexDirection: 'column',

        //HACK : 레이아웃 확인용
        borderWidth: 1,
        borderColor: '#000000',
    },
    myFoodText: {
        marginBottom: 23,
        fontSize: 18,
    },
    filterTable: {
        paddingHorizontal: 6,
    },
    filterLeft: {
        alignItems: 'flex-start',
    },
    filterRight: {
        alignItems: 'flex-end',
    },
    myFoodTable: {
        marginBottom: 26,
        padding: 8,
        gap: 15,
    },
});