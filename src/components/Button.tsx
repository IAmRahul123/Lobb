import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'

interface ButtonProps {
    onPress: () => void;
    title: string;
    icon?: ReactNode;
    btnStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = React.memo(({ onPress, title, icon = null, btnStyle = {}, textStyle = {} }) => {
    return (
        <TouchableOpacity style={[styles.refreshButton, btnStyle]} onPress={onPress}>
            {icon}
            <Text style={[styles.refreshText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
})

export default Button

const styles = StyleSheet.create({
    refreshButton: {
        backgroundColor: '#d6d6d6',
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
