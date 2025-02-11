import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { ContextProvider } from '../../store/ContextProvider';
import DateComponent from './comp/DateComponent';

const Home: React.FC = () => {
    const context = useContext(ContextProvider);
    const navigation = useNavigation();

    if (!context) return null; // Ensure context is available
    const { statusBarHeight, cardDetails, getCardDetails } = context;

    const onCardClick = () => {
        navigation.navigate('Details' as never);
    };

    return (
        <View style={[styles.container, { marginTop: (statusBarHeight || 0) + 24 }]}> 
            <DateComponent />
            <Card details={cardDetails} onCardClick={onCardClick} onRefreshPress={getCardDetails} />
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
});
