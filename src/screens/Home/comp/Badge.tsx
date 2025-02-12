import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../config/colors'
import { getInitials } from '../../../utils/formatter'

interface BadgeProps {
    name: string
}
const Badge: React.FC<BadgeProps> = React.memo(({ name }) => {
    const initials = getInitials(name)
    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{initials || "VS"}</Text>
        </View>
    )
})

export default Badge

const styles = StyleSheet.create({
    badgeContainer: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: colors.LIGHT_GREY,
        alignSelf: 'flex-end',
    },
    badgeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.BLACK,
    },
})
