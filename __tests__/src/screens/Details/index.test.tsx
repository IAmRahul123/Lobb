import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { Share } from 'react-native';
import { ContextProvider } from '../../../../src/store/ContextProvider';
import CardDetails from '../../../../src/screens/Details';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// jest.mock('react-native-share', () => ({
//   share: jest.fn(),
// }));

describe('CardDetails Component', () => {
  const mockNavigation = { goBack: jest.fn() };
  (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

  const mockCardDetails = {
    title: 'Sample Title',
    subTitle: 'Sample Subtitle',
    mainImage: 'https://example.com/image.jpg',
    thumbNailImage: 'https://example.com/thumbnail.jpg',
    text: '<p>Sample paragraph</p>',
    logo: 'https://example.com/logo.jpg',
  };

  const mockContextValue = {
    cardDetails: mockCardDetails,
    getCardDetails: jest.fn(),
  };

  it('renders correctly', () => {
    const { getAllByText, getByTestId } = render(
      <ContextProvider.Provider value={mockContextValue}>
        <CardDetails />
      </ContextProvider.Provider>
    );

    expect(getAllByText('Sample Title')[0]).toBeTruthy();
    expect(getAllByText('Sample Subtitle')[0]).toBeTruthy();
    expect(getByTestId('main-image')).toBeTruthy();
  });

  it('calls navigation.goBack when close button is pressed', () => {
    const { getByText } = render(
      <ContextProvider.Provider value={mockContextValue}>
        <CardDetails />
      </ContextProvider.Provider>
    );

    const closeButton = getByText('X');
    fireEvent.press(closeButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('calls getCardDetails when Refresh button is pressed', () => {
    const { getByText,getAllByText } = render(
      <ContextProvider.Provider value={mockContextValue}>
        <CardDetails />
      </ContextProvider.Provider>
    );

    const refreshButton = getAllByText('REFRESH')[0];
    fireEvent.press(refreshButton);

    expect(mockContextValue.getCardDetails).toHaveBeenCalled();
  });

  it('calls Share when Share button is pressed', async () => {
    jest.spyOn(Share, 'share').mockImplementation(() => Promise.resolve());

    const { getByText } = render(
      <ContextProvider.Provider value={mockContextValue}>
        <CardDetails />
      </ContextProvider.Provider>
    );

    const shareButton = getByText('Share');
    fireEvent.press(shareButton);

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalledWith({ message: 'Sample Title' });
    });
  });
});
