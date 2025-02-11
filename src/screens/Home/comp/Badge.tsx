import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Badge: React.FC = React.memo(() => {
    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>VS</Text>
        </View>
    )
})

export default Badge

const styles = StyleSheet.create({
    badgeContainer: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#d6d6d6',
        alignSelf: 'flex-end',
    },
    badgeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
})
