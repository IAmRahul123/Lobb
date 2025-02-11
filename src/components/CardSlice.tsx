import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'

interface CardSliceProps {
    details?: {
        title?: string;
        subTitle?: string;
    };
    onRefreshPress: () => void;
}

const CardSlice: React.FC<CardSliceProps> = ({ details = {}, onRefreshPress }) => {
    return (
        <View style={styles.contentContainer}>
            <View style={styles.userInfoContainer}>
                <Image
                    source={require("../assets/img2.jpg")}
                    resizeMode='contain'
                    style={styles.avatarImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{details?.title || "No Title"}</Text>
                    <Text style={styles.subTitle} numberOfLines={1}>{details?.subTitle || "No Subtitle"}</Text>
                </View>
            </View>

            <View style={styles.actionContainer}>
                <Button title="REFRESH" onPress={onRefreshPress} />
                <Text style={styles.userName} numberOfLines={1}>In-App Purchase</Text>
            </View>
        </View>
    )
}

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
        color: '#000'
    },
    subTitle: {
        fontSize: 10,
        color: '#666'
    },
    actionContainer: {
        alignItems: 'center'
    },
    userName: {
        color: '#d6d6d6',
        fontSize: 8,
        fontWeight: '800'
    }
})
