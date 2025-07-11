import React from "react";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBottomSheet = ({
    bottomSheetModalRef,
    children,
    snapPoints = ["30%"],
    enableDynamicSizing = true,
    onBackdropPress,
    ...props
}) => {
    // Backdrop 컴포넌트 렌더링 함수
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
            animationConfigs={styles.animation}
            animateOnMount={true}
            backdropComponent={renderBackdrop}
            {...props}
        >
            <BottomSheetView style={styles.content}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = {
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
    animation: {
        duration: 300,
        easing: 'easeOut',
    },
};

export default CustomBottomSheet;