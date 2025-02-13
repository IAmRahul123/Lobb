import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CardDetailsType } from '../../../src/@types/cardTypes';
import CardSlice from '../../../src/components/CardSlice';


const mockDetails: CardDetailsType = {
    logo: 'https://via.placeholder.com/40',
    title: 'Sample Title',
    subTitle: 'Sample Subtitle',
    mainImage: 'https://via.placeholder.com/150',
    thumbNailImage: 'https://example.com/thumbnail.jpg',
    text: '<p>Sample paragraph</p>',
    userName: 'Aditya Ranjan',
    id: 1
};

describe('CardSlice Component', () => {
    test('renders correctly with provided details', () => {
        const { getByTestId } = render(<CardSlice details={mockDetails} onRefreshPress={() => {}} />);
        expect(getByTestId('card-slice-container')).toBeTruthy();
    });

    test('displays correct avatar image', () => {
        const { getByTestId } = render(<CardSlice details={mockDetails} onRefreshPress={() => {}} />);
        const image = getByTestId('avatar-image');
        expect(image.props.source.uri).toBe(mockDetails.logo);
    });

    test('displays correct title and subtitle', () => {
        const { getByText } = render(<CardSlice details={mockDetails} onRefreshPress={() => {}} />);
        expect(getByText('Sample Title')).toBeTruthy();
        expect(getByText('Sample Subtitle')).toBeTruthy();
    });

    test('calls onRefreshPress when refresh button is pressed', () => {
        const onRefreshPressMock = jest.fn();
        const { getByTestId } = render(<CardSlice details={mockDetails} onRefreshPress={onRefreshPressMock} />);
        
        fireEvent.press(getByTestId('refresh-button'));
        expect(onRefreshPressMock).toHaveBeenCalledTimes(1);
    });
});
