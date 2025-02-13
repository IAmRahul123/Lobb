import React from 'react';
import { render } from '@testing-library/react-native';
import { formatDate } from '../../../../../src/utils/formatter';
import DateComponent from '../../../../../src/screens/Home/comp/DateComponent';
import Badge from '../../../../../src/screens/Home/comp/Badge';

jest.mock('../../../../../src/utils/formatter', () => ({
    formatDate: jest.fn(),
}));

jest.mock('../../../../../src/screens/Home/comp/Badge', () => jest.fn(() => null));

describe('DateComponent', () => {
    beforeEach(() => {
        (formatDate as jest.Mock).mockReturnValue('MONDAY 12 FEBRUARY');
    });

    it('renders correctly', () => {
        const { getByText } = render(<DateComponent name="John Doe" />);
        expect(getByText('MONDAY 12 FEBRUARY')).toBeTruthy();
        expect(getByText('Today')).toBeTruthy();
    });

    it('displays the correct date', () => {
        const { getByText } = render(<DateComponent name="John Doe" />);
        expect(getByText('MONDAY 12 FEBRUARY')).toBeTruthy();
    });

    it('renders the "Today" text', () => {
        const { getByText } = render(<DateComponent name="John Doe" />);
        expect(getByText('Today')).toBeTruthy();
    });

    it('passes the correct name prop to Badge', () => {
        render(<DateComponent name="John Doe" />);
        expect(Badge).toHaveBeenCalledWith({ name: 'John Doe' }, expect.anything());
    });
});
