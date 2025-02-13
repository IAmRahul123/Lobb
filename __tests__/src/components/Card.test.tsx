import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../../src/components/Card';
import { CardDetailsType } from '../../../src/@types/cardTypes';

const mockDetails: CardDetailsType = {
    mainImage: 'https://via.placeholder.com/150',
    title: 'Sample Card',
    subTitle: 'Sample Subtitle',
    thumbNailImage: 'https://example.com/thumbnail.jpg',
    text: '<p>Sample paragraph</p>',
    logo: 'https://example.com/logo.jpg',
    userName: 'Aditya Ranjan',
    id: 1
};

describe('Card Component', () => {
    test('renders card with correct details', () => {
        const { getByTestId } = render(
            <Card details={mockDetails} onRefreshPress={() => { }} onCardClick={() => { }} />
        );
        expect(getByTestId('card-container')).toBeTruthy();
    });

    test('displays the correct image', () => {
        const { getByTestId } = render(<Card details={mockDetails} onRefreshPress={() => { }} onCardClick={() => { }} />);
        const image = getByTestId('card-main-image');
        expect(image.props.source.uri).toBe(mockDetails.mainImage);
    });

    test('calls onCardClick when card is pressed', () => {
        const onCardClickMock = jest.fn();
        const { getByTestId } = render(<Card details={mockDetails} onRefreshPress={() => { }} onCardClick={onCardClickMock} />);

        fireEvent.press(getByTestId('card-container'));
        expect(onCardClickMock).toHaveBeenCalledTimes(1);
    });

    test('calls onRefreshPress when refresh button in CardSlice is pressed', () => {
        const onRefreshPressMock = jest.fn();
        const { getByTestId } = render(<Card details={mockDetails} onRefreshPress={onRefreshPressMock} onCardClick={() => { }} />);

        fireEvent.press(getByTestId('refresh-button'));
        expect(onRefreshPressMock).toHaveBeenCalledTimes(1);
    });
});
