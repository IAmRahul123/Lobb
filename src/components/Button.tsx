import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { colors } from '../config/colors';

interface ButtonProps {
    onPress: () => void;
    title: string;
    testID?: string;
    icon?: ReactNode;
    btnStyle?: ViewStyle;
    textStyle?: TextStyle;
}

// Custom Button Component with icon (optional) and with customizable styles
const Button: React.FC<ButtonProps> = React.memo(({ onPress, title, icon = null, btnStyle = {}, textStyle = {}, testID = "" }) => {
    return (
        <TouchableOpacity testID={testID} style={[styles.refreshButton, btnStyle]} onPress={onPress}>
            {icon}
            <Text style={[styles.refreshText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
})

export default Button

const styles = StyleSheet.create({
    refreshButton: {
        backgroundColor: colors.LIGHT_GREY,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    refreshText: {
        color: 'blue',
        fontSize: 12
    },
})
