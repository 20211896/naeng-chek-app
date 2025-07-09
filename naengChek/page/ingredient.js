import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Dimensions } from 'react-native';
import BtmNav from '../component/btmNav';
import IngredBox from '../component/ingredComp/ingredBox';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomBtn from '../component/btnStyle/customBtn';
import FloatingButton from '../component/btnStyle/floatingBtn';

const screenHeight = Dimensions.get('window').height;

export default function Ingredient({ navigation }) {
    const [sortTitle, setSortTitle] = useState('최신 등록순');
    const [sortType, setSortType] = useState('식재료 종류');
    const [sortStorage, setSortStorage] = useState('보관장소');
    const [sortExpiration, setSortExpiration] = useState('유통기한');

    // TODO: 필터 버튼 onPress 동작 구현 -> 바텀 시트
    // TODO: 필터에 따른 IngredBox 보여지는 조건 설정
    // TODO: IngredBox 생성에 따른 박스 자동생성 설정(지금은 하드코딩으로 생성해둠)

    const sortPress = () => {
    };

    return (
        <View style={styles.container}>
            <View style={styles.ingredientHeader}>
                <Text style={styles.headerText}>보유한 식재료</Text>
                <View style={styles.headerIcons}>
                    <AntDesign name="search1" size={24} color="black" style={styles.headerIcon} onPress={() => { }} />
                    <Ionicons name="calendar-clear-outline" size={24} color="black" style={styles.headerIcon} onPress={() => { }} />
                    <Ionicons name="trash-outline" size={24} color="black" style={styles.headerIcon} onPress={() => { }} />
                </View>
            </View>

            <View style={styles.alram}>
                <View style={styles.alramBox}>
                    <View style={styles.alramTextBox}>
                        <View style={styles.alramBoxIcon} />
                        <Text>오늘까지 소비해야 하는 재료</Text>
                        <Text style={styles.amountText}>개수</Text>
                    </View>
                    <AntDesign name="right" size={14} color="black" onPress={() => { }} />
                </View>
                <View style={styles.alramBox}>
                    <View style={styles.alramTextBox}>
                        <View style={styles.alramBoxIcon} />
                        <Text>일주일 내에 소비해야 하는 재료</Text>
                        <Text style={styles.amountText}>개수</Text>
                    </View >
                    <AntDesign name="right" size={14} color="black" onPress={() => { }} />
                </View>
            </View>

            <View style={styles.filterBox}>
                <CustomBtn
                    title={sortTitle}
                    fontSize={12}
                    onPress={sortPress}
                    icon={<AntDesign name="down" size={12} color="black" />}
                    paddingXFactor={0.8}
                    paddingYFactor={0.4}
                    borderRadius={99}
                    textColor="black"
                />
                <CustomBtn
                    title={sortType}
                    fontSize={12}
                    onPress={() => { }}
                    icon={<AntDesign name="down" size={12} color="black" />}
                    paddingXFactor={0.8}
                    paddingYFactor={0.4}
                    borderRadius={99}
                    textColor="black"
                />
                <CustomBtn
                    title={sortStorage}
                    fontSize={12}
                    onPress={() => { }}
                    icon={<AntDesign name="down" size={12} color="black" />}
                    paddingXFactor={0.8}
                    paddingYFactor={0.4}
                    borderRadius={99}
                    textColor="black"
                />
                <CustomBtn
                    title={sortExpiration}
                    fontSize={12}
                    onPress={() => { }}
                    icon={<AntDesign name="down" size={12} color="black" />}
                    paddingXFactor={0.8}
                    paddingYFactor={0.4}
                    borderRadius={99}
                    textColor="black"
                />
            </View>

            <ScrollView>
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
                <IngredBox />
            </ScrollView>

            <FloatingButton />

            <BtmNav navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ingredientHeader: {
        marginTop: 60,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada"
    },
    headerText: {
        marginStart: 10,
        paddingVertical: 10,
        fontSize: 24,
        fontWeight: 550,
    },
    headerIcons: {
        flexDirection: 'row'
    },
    headerIcon: {
        padding: 10,

    },

    alram: {
        margin: 20,
        paddingHorizontal: 16,
        paddingVertical: 22,
        gap: 10,
        borderRadius: 12,

        //HACK : 레이아웃 확인용
        backgroundColor: "#dadada"
    },
    alramBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    alramBoxIcon: {
        width: 20,
        height: 20,

        //HACK : 레이아웃 확인용
        backgroundColor: '#fff'
    },
    alramTextBox: {
        flexDirection: 'row',
        fontSize: 14,
        gap: 10
    },
    amountText: {
        fontWeight: 600
    },
    filterBox: {
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    filterFont: {
        fontSize: 12
    },
});