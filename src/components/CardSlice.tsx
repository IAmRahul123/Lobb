import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { colors } from '../config/colors';
import { CardDetailsType } from '../@types/cardTypes';

interface CardSliceProps {
    details: CardDetailsType;
    onRefreshPress: () => void;
}

const CardSlice: React.FC<CardSliceProps> = React.memo(({ details, onRefreshPress }) => {
    return (
        <View style={styles.contentContainer}>
            <View style={styles.userInfoContainer}>
                <Image
                    source={{uri:details?.logo}}
                    resizeMode='contain'
                    style={styles.avatarImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{details?.title || ""}</Text>
                    <Text style={styles.subTitle} numberOfLines={1}>{details?.subTitle || ""}</Text>
                </View>
            </View>

            <View style={styles.actionContainer}>
                <Button title="REFRESH" onPress={onRefreshPress} />
                <Text style={styles.userName} numberOfLines={1}>In-App Purchase</Text>
            </View>
        </View>
    )
})

export default CardSlice

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12
    },
    avatarImage: {
        borderRadius: 8,
        height: 40,
        width: 40
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.BLACK
    },
    subTitle: {
        fontSize: 10,
        color: colors.LIGHT_GREY_VAR
    },
    actionContainer: {
        alignItems: 'center'
    },
    userName: {
        color: colors.LIGHT_GREY,
        fontSize: 8,
        fontWeight: '800'
    }
})
