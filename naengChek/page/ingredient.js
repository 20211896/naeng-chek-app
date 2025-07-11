import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import BtmNav from '../component/btmNav';
import IngredBox from '../component/ingredComp/ingredBox';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomBtn from '../component/btnStyle/customBtn';
import FloatingButton from '../component/btnStyle/floatingBtn';
import CustomBottomSheet from '../component/ingredComp/CustomBottomSheet';

const screenHeight = Dimensions.get('window').height;

// HACK: 샘플 데이터 - 실제로는 API에서 가져오거나 상태관리에서 가져올 데이터
const SAMPLE_INGREDIENTS = [
    {
        id: 1,
        name: '양파',
        storage: '냉장실',
        expiryDate: '2024-01-15',
        quantity: '3개',
        type: '채소',
        registeredDate: '2024-01-01',
        imageUrl: 'https://picsum.photos/80/80?random=1'
    },
    {
        id: 2,
        name: '우유',
        storage: '냉장실',
        expiryDate: '2024-01-10',
        quantity: '1L',
        type: '유제품',
        registeredDate: '2024-01-05',
        imageUrl: 'https://picsum.photos/80/80?random=2'
    },
    {
        id: 3,
        name: '계란',
        storage: '냉장실',
        expiryDate: '2024-01-20',
        quantity: '10개',
        type: '축산물',
        registeredDate: '2024-01-03',
        imageUrl: 'https://picsum.photos/80/80?random=3'
    },
    {
        id: 4,
        name: '라면',
        storage: '상온',
        expiryDate: '2024-06-01',
        quantity: '5개',
        type: '가공식품',
        registeredDate: '2024-01-02',
        imageUrl: 'https://picsum.photos/80/80?random=4'
    },
    {
        id: 5,
        name: '사과',
        storage: '냉장실',
        expiryDate: '2024-01-12',
        quantity: '6개',
        type: '과일',
        registeredDate: '2024-01-06',
        imageUrl: 'https://picsum.photos/80/80?random=5'
    }
];

export default function Ingredient({ navigation }) {
    // NOTE: 정렬 state
    const [sortTitle, setSortTitle] = useState('최신 등록순');
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [currentBottomSheetType, setCurrentBottomSheetType] = useState('sort');

    // NOTE: 필터 state
    const [selectedType, setSelectedType] = useState('식재료종류');
    const [selectedStorage, setSelectedStorage] = useState('보관장소');
    const [selectedExpiration, setSelectedExpiration] = useState('유통기한');

    const bottomSheetRef = useRef(null);
    const filterBottomSheetRef = useRef(null);

    // NOTE: 필터 옵션들 생성
    const getFilterOptions = () => {
        const types = [...new Set(SAMPLE_INGREDIENTS.map(item => item.type))];
        const storages = [...new Set(SAMPLE_INGREDIENTS.map(item => item.storage))];
        const expirationOptions = ['만료됨', '임박(3일 이내)', '1주일 이내', '1개월 이내'];

        return {
            types,
            storages,
            expirationOptions
        };
    };

    // NOTE: 필터링 및 정렬된 데이터 저장
    const filteredAndSortedIngredients = useMemo(() => {
        let filtered = [...SAMPLE_INGREDIENTS];

        if (selectedType !== '식재료종류') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        if (selectedStorage !== '보관장소') {
            filtered = filtered.filter(item => item.storage === selectedStorage);
        }

        if (selectedExpiration !== '유통기한') {
            const today = new Date();
            const threeDaysLater = new Date(today);
            threeDaysLater.setDate(today.getDate() + 3);
            const oneWeekLater = new Date(today);
            oneWeekLater.setDate(today.getDate() + 7);

            filtered = filtered.filter(item => {
                const itemExpiry = new Date(item.expiryDate);

                switch (selectedExpiration) {
                    case '만료됨':
                        return itemExpiry < today;
                    case '임박(3일 이내)':
                        return itemExpiry >= today && itemExpiry <= threeDaysLater;
                    case '1주일 이내':
                        return itemExpiry >= today && itemExpiry <= oneWeekLater;
                    case '1개월 이내':
                        const oneMonthLater = new Date(today);
                        oneMonthLater.setMonth(today.getMonth() + 1);
                        return itemExpiry >= today && itemExpiry <= oneMonthLater;
                    default:
                        return true;
                }
            });
        }

        filtered.sort((a, b) => {
            switch (sortTitle) {
                case '유통기한 빠른 순':
                    return new Date(a.expiryDate) - new Date(b.expiryDate);
                case '최신 등록순':
                    return new Date(b.registeredDate) - new Date(a.registeredDate);
                case '가나다 순':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [SAMPLE_INGREDIENTS, selectedType, selectedStorage, selectedExpiration, sortTitle]);

    const openBottomSheet = (type = 'sort') => {
        setCurrentBottomSheetType(type);
        setIsBottomSheetOpen(true);

        if (type === 'sort') {
            bottomSheetRef.current?.snapToIndex(0);
        } else if (type === 'filter') {
            filterBottomSheetRef.current?.snapToIndex(0);
        }
    };

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
        bottomSheetRef.current?.close();
        filterBottomSheetRef.current?.close();
    };

    const handleBackdropPress = () => {
        closeBottomSheet();
    };

    const handleSortOption = (option) => {
        setSortTitle(option);
        closeBottomSheet();
    };

    // NOTE: 필터 추가/제거 함수
    const toggleFilter = (category, value) => {
        switch (category) {
            case 'type':
                setSelectedType(value === selectedType ? '식재료종류' : value);
                break;
            case 'storage':
                setSelectedStorage(value === selectedStorage ? '보관장소' : value);
                break;
            case 'expiration':
                setSelectedExpiration(value === selectedExpiration ? '유통기한' : value);
                break;
        }
    };

    // NOTE: 전체 필터 초기화
    const clearAllFilters = () => {
        setSelectedType('식재료종류');
        setSelectedStorage('보관장소');
        setSelectedExpiration('유통기한');
    };

    const isFilterSelected = (category, value) => {
        switch (category) {
            case 'type':
                return selectedType === value;
            case 'storage':
                return selectedStorage === value;
            case 'expiration':
                return selectedExpiration === value;
            default:
                return false;
        }
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (selectedType !== '식재료종류') count++;
        if (selectedStorage !== '보관장소') count++;
        if (selectedExpiration !== '유통기한') count++;
        return count;
    };

    const renderBottomSheetContent = () => {
        if (currentBottomSheetType === 'sort') {
            const sortOptions = ['유통기한 빠른 순', '최신 등록순', '가나다 순'];

            return (
                <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>정렬</Text>
                        <TouchableOpacity onPress={closeBottomSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {sortOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => handleSortOption(option)}
                        >
                            <Text style={[
                                styles.optionText,
                                { color: sortTitle === option ? '#000' : '#6E6E6E' }
                            ]}>
                                {option}
                            </Text>
                            {sortTitle === option && (
                                <AntDesign name="check" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            );
        } else if (currentBottomSheetType === 'filter') {
            const { types, storages, expirationOptions } = getFilterOptions();

            return (
                <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>필터</Text>
                        <TouchableOpacity onPress={closeBottomSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* NOTE: 식재료 종류 섹션 */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>식재료 종류</Text>
                            <View style={styles.filterOptions}>
                                {types.map((type, index) => (
                                    <CustomBtn
                                        key={index}
                                        title={type}
                                        fontSize={14}
                                        onPress={() => toggleFilter('type', type)}
                                        paddingXFactor={0.8}
                                        paddingYFactor={0.5}
                                        borderRadius={20}
                                        textColor={isFilterSelected('type', type) ? '#fff' : '#666'}
                                        backgroundColor={isFilterSelected('type', type) ? '#525252' : '#dadada'}
                                        pressedStyle={{ backgroundColor: '#525252', borderWidth: 0 }}
                                        pressedTextColor="#fff"
                                    />
                                ))}
                            </View>
                        </View>

                        {/* NOTE: 보관장소 섹션 */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>보관장소</Text>
                            <View style={styles.filterOptions}>
                                {storages.map((storage, index) => (
                                    <CustomBtn
                                        key={index}
                                        title={storage}
                                        fontSize={14}
                                        onPress={() => toggleFilter('storage', storage)}
                                        paddingXFactor={0.8}
                                        paddingYFactor={0.5}
                                        borderRadius={20}
                                        textColor={isFilterSelected('storage', storage) ? '#fff' : '#666'}
                                        backgroundColor={isFilterSelected('storage', storage) ? '#525252' : '#dadada'}
                                        pressedStyle={{ backgroundColor: '#525252', borderWidth: 0 }}
                                        pressedTextColor="#fff"
                                    />
                                ))}
                            </View>
                        </View>

                        {/* NOTE: 유통기한 섹션 */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>유통기한</Text>
                            <View style={styles.filterOptions}>
                                {expirationOptions.map((expiration, index) => (
                                    <CustomBtn
                                        key={index}
                                        title={expiration}
                                        fontSize={14}
                                        onPress={() => toggleFilter('expiration', expiration)}
                                        paddingXFactor={0.8}
                                        paddingYFactor={0.5}
                                        borderRadius={20}
                                        textColor={isFilterSelected('expiration', expiration) ? '#fff' : '#666'}
                                        backgroundColor={isFilterSelected('expiration', expiration) ? '#525252' : '#dadada'}
                                        pressedStyle={{ backgroundColor: '#525252', borderWidth: 0 }}
                                        pressedTextColor="#fff"
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.filterBottomButtons}>
                        <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
                            <Text style={styles.clearButtonText}>초기화</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={closeBottomSheet}>
                            <Text style={styles.applyButtonText}>
                                {filteredAndSortedIngredients.length}개 결과보기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.ingredientHeader}>
                <Text style={styles.headerText}>
                    보유한 식재료
                </Text>
                <View style={styles.headerIcons}>
                    <AntDesign
                        name="search1"
                        size={24}
                        color="black"
                        style={styles.headerIcon}
                        onPress={() => { }}
                    />
                    <Ionicons name="calendar-clear-outline" size={24} color="black" style={styles.headerIcon} onPress={() => { }} />
                    <Ionicons name="trash-outline" size={24} color="black" style={styles.headerIcon} onPress={() => { }} />
                </View>
            </View>

            {/* NOTE: 필터 영역 */}
            <View style={styles.filterContainer}>
                <View style={styles.filterBox}>
                    <CustomBtn
                        title={sortTitle}
                        fontSize={12}
                        onPress={() => openBottomSheet('sort')}
                        icon={<AntDesign name="down" size={11} color="black" />}
                        paddingXFactor={0.8}
                        paddingYFactor={0.4}
                        borderRadius={99}
                        textColor="black"
                    />

                    <CustomBtn
                        title={selectedType}
                        fontSize={12}
                        onPress={() => openBottomSheet('filter')}
                        icon={<AntDesign name="down" size={11} color="black" />}
                        paddingXFactor={0.8}
                        paddingYFactor={0.4}
                        borderRadius={99}
                        textColor="black"
                    />

                    <CustomBtn
                        title={selectedStorage}
                        fontSize={12}
                        onPress={() => openBottomSheet('filter')}
                        icon={<AntDesign name="down" size={11} color="black" />}
                        paddingXFactor={0.8}
                        paddingYFactor={0.4}
                        borderRadius={99}
                        textColor="black"
                    />

                    <CustomBtn
                        title={selectedExpiration}
                        fontSize={12}
                        onPress={() => openBottomSheet('filter')}
                        icon={<AntDesign name="down" size={11} color="black" />}
                        paddingXFactor={0.8}
                        paddingYFactor={0.4}
                        borderRadius={99}
                        textColor="black"
                    />
                </View>
            </View>

            <ScrollView>
                {filteredAndSortedIngredients.map((ingredient) => (
                    <IngredBox
                        key={ingredient.id}
                        ingredient={ingredient}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>

            {!isBottomSheetOpen && <FloatingButton />}
            <BtmNav navigation={navigation} />

            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                snapPoints={["30%"]}
                onBackdropPress={handleBackdropPress}
                onChange={(index) => {
                    if (index === -1) {
                        closeBottomSheet();
                    }
                }}
            >
                {currentBottomSheetType === 'sort' && renderBottomSheetContent()}
            </CustomBottomSheet>

            <CustomBottomSheet
                bottomSheetModalRef={filterBottomSheetRef}
                snapPoints={["80%"]}
                enableDynamicSizing={true}
                enableOverDrag={false}
                onBackdropPress={handleBackdropPress}
                onChange={(index) => {
                    if (index === -1) {
                        closeBottomSheet();
                    }
                }}
            >
                {currentBottomSheetType === 'filter' && renderBottomSheetContent()}
            </CustomBottomSheet>
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
        backgroundColor: "#dadada"
    },
    headerText: {
        marginStart: 10,
        paddingVertical: 10,
        fontSize: 24,
        fontWeight: '550',
    },
    headerIcons: {
        flexDirection: 'row'
    },
    headerIcon: {
        padding: 10,
    },
    filterContainer: {
        width: '100%',
        alignItems: 'center',
    },
    filterBox: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 0,
        margin: 0,
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 16,
    },
    filterSection: {
        marginBottom: 25,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    filterOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    customBtnWrapper: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
    },
    customBtnWrapperSelected: {
        backgroundColor: '#007AFF',
    },
    filterBottomButtons: {
        flexDirection: 'row',
        gap: 12,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    clearButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    clearButtonText: {
        fontSize: 16,
        color: '#666',
    },
    applyButton: {
        flex: 2,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});