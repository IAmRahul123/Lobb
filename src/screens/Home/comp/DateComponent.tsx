import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatDate } from '../../../utils/formatter'
import Badge from './Badge'
import { colors } from '../../../config/colors'

interface DateComponentProps {
    name: string
}

const DateComponent: React.FC<DateComponentProps> = React.memo(({ name }) => {
    //get todays date formatted
    const DATE = formatDate()
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{DATE}</Text>
            <View style={styles.headerRow}>
                <Text style={styles.todayText}>Today</Text>
                <Badge name={name} />
            </View>
        </View>
    )
})

export default DateComponent

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    dateText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'grey',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    todayText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.BLACK,
    },
})
