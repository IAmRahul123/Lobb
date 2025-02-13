import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Button from '../../../src/components/Button';

describe('Button Component', () => {
    test('renders the button with the correct title', () => {
        const { getByText } = render(<Button onPress={() => {}} title="Click Me" />);
        expect(getByText('Click Me')).toBeTruthy();
    });

    test('calls onPress when button is clicked', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button onPress={onPressMock} title="Click Me" />);

        fireEvent.press(getByText('Click Me'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    test('renders an icon if provided', () => {
        const { getByTestId } = render(
            <Button 
                onPress={() => {}} 
                title="Click Me" 
                icon={<Text testID="icon">🔄</Text>} 
            />
        );
        expect(getByTestId('icon')).toBeTruthy();
    });
});
