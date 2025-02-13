import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from '../../../../../src/screens/Home/comp/Badge';

describe('Badge Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Badge name="John Doe" />);
        expect(getByText('JD')).toBeTruthy();
    });

    it('applies correct styles', () => {
        const { getByText } = render(<Badge name="John Doe" />);
        const textElement = getByText('JD');
        expect(textElement.props.style).toEqual(
            expect.objectContaining({
                fontSize: 20,
                fontWeight: 'bold',
            })
        );
    });
});
