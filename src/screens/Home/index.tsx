import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { ContextProvider } from '../../store/ContextProvider';
import DateComponent from './comp/DateComponent';
import { colors } from '../../config/colors';

const Home: React.FC = () => {
    const context = useContext(ContextProvider);
    const navigation = useNavigation();

    if (!context) return null; // Ensure context is available
    const { statusBarHeight, cardDetails, loading, getCardDetails } = context;

    // Function for handling Card Click
    const onCardClick = () => {
        navigation.navigate('Details' as never);
    };

    return (
        <View testID='home-container' style={[styles.container, { marginTop: (statusBarHeight || 0) + 24 }]}>
            {/* show loader until API calls end */}
            {loading ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator testID='loading-indicator' color={colors.BLACK} />
                </View>
                // for  no data show no data text
                : !cardDetails ?
                    <View style={styles.loaderContainer}>
                        <Text style={styles.noDataText}>No Posts</Text>
                    </View> 
                // Show Post component if cardDetails exist
                :
                    <>
                        <DateComponent name={cardDetails?.userName} />
                        <Card details={cardDetails} onCardClick={onCardClick} onRefreshPress={getCardDetails} />
                    </>
            }
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 8,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: colors.BLACK,
        fontSize: 14
    }
});
