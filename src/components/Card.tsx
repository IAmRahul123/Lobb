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
import { CardDetailsType } from '../@types/cardTypes';
import { colors } from '../config/colors';

interface CardProps {
    details: CardDetailsType,
    onRefreshPress: () => void,
    onCardClick: () => void,
}
const Card: React.FC<CardProps> = React.memo(({
    details,
    onRefreshPress = () => { },
    onCardClick = () => { }
}) => {
    return (
        <TouchableOpacity testID='card-container' style={styles.cardContainer} onPress={onCardClick}>
            <Image
                testID='card-main-image'
                source={{ uri: details?.mainImage }}
                resizeMode='cover'
                style={styles.mainImage}
                alt='Main Image'
            />

            <CardSlice onRefreshPress={onRefreshPress} details={details} />
        </TouchableOpacity>
    );
})

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.WHITE,
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
