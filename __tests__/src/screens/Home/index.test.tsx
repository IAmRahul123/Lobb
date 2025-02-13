import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { ContextProvider } from '../../../../src/store/ContextProvider';
import Home from '../../../../src/screens/Home';
import DateComponent from '../../../../src/screens/Home/comp/DateComponent';
import Card from '../../../../src/components/Card';


jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('../../../../src/screens/Home/comp/DateComponent', () => jest.fn(() => null)); // Mock DateComponent
jest.mock('../../../../src/components/Card', () => jest.fn(() => null)); // Mock Card

describe('Home Component', () => {
    const mockContext = {
        statusBarHeight: 20,
        cardDetails: { userName: 'John Doe', balance: 1000 },
        loading: false,
        getCardDetails: jest.fn(),
    };

    let mockNavigation: any;

    beforeEach(() => {
        mockNavigation = { navigate: jest.fn() };
        (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    });

    it('renders correctly', () => {
        const { getByTestId } = render(
            <ContextProvider.Provider value={mockContext}>
                <Home />
            </ContextProvider.Provider>
        );

        expect(getByTestId('home-container')).toBeTruthy();
    });

    it('shows loader when loading', () => {
        const { getByTestId } = render(
            <ContextProvider.Provider value={{ ...mockContext, loading: true }}>
                <Home />
            </ContextProvider.Provider>
        );

        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('renders DateComponent and Card after loading', () => {
        render(
            <ContextProvider.Provider value={mockContext}>
                <Home />
            </ContextProvider.Provider>
        );

        expect(DateComponent).toHaveBeenCalledWith({ name: 'John Doe' }, expect.anything());
        expect(Card).toHaveBeenCalledWith(
            {
                details: mockContext.cardDetails,
                onCardClick: expect.any(Function),
                onRefreshPress: mockContext.getCardDetails,
            },
            expect.anything()
        );
    });
});
