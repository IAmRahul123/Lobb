import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { height } from '../config/constants';
import CardSlice from './CardSlice';
import { CardDetailsType } from '../store/ContextProvider';

interface CardProps {
    details: CardDetailsType,
    onRefreshPress: () => void,
    onCardClick: () => void,
}
const Card: React.FC<CardProps> = ({
    details,
    onRefreshPress = () => { },
    onCardClick = () => { }
}) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onCardClick}>
            {/* require("../assets/img2.jpg" */}
            <Image
                source={{ uri: details?.mainImage}}
                resizeMode='cover'
                style={styles.mainImage}
                alt='Main Image'
            />

            <CardSlice onRefreshPress={onRefreshPress} details={details} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        width: '100%',
        overflow: 'hidden'
    },
    mainImage: {
        width: '100%',
        height: height * 0.6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

});

export default Card;
