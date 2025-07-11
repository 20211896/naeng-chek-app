import React from "react";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

/*NOTE: CustomBottomSheet 컴포넌트 프롭 설명
 * bottomSheetModalRef - 바텀시트 참조 객체 (useRef로 생성)
 * children - 바텀시트 내부에 렌더링될 컴포넌트
 * snapPoints - 바텀시트 스냅 포인트 배열 (기본값: ["30%"])
 * enableDynamicSizing - 동적 크기 조절 활성화 여부 (기본값: true)
 * onBackdropPress - 외부 배경 클릭 시 실행될 함수
 * ...props - 추가 BottomSheet 프롭들
 */
export default function CustomBottomSheet({
    bottomSheetModalRef,
    children,
    snapPoints = ["30%"],
    enableDynamicSizing = true,
    onBackdropPress,
    ...props
}) {
    // NOTE: Backdrop 컴포넌트 렌더링 함수
    const renderBackdrop = React.useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                onPress={onBackdropPress}
            />
        ),
        [onBackdropPress]
    );

    return (
        <BottomSheet
            ref={bottomSheetModalRef}
            index={-1}
            snapPoints={snapPoints}
            style={styles.container}
            enableDynamicSizing={enableDynamicSizing}
            enablePanDownToClose={true}
            enableOverDrag={false}
            backgroundStyle={styles.background}
            handleStyle={styles.handle}
            handleIndicatorStyle={styles.handleIndicator}
            animateOnMount={true}
            backdropComponent={renderBackdrop}
            {...props}
        >
            <BottomSheetView style={styles.content}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1001,
        elevation: 1001,
    },
    background: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 2,
        borderTopColor: '#9CA3AF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    handle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    handleIndicator: {
        backgroundColor: '#6B7280',
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});