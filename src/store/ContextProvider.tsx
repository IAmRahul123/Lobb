import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { GET_POST_URL, GET_TOKEN_URL, MY_EMAIL } from '../config/constants';

// Define types for context values
interface ContextType {
  token: string;
  cardDetails: CardDetailsType;
  statusBarHeight: number | undefined;
  getCardDetails: () => Promise<void>;
}

// Define types for the card details structure
interface CardDetailsType {
  thumbNailImage: string;
  mainImage: string;
  userName: string;
  subTitle: string;
  text: string;
  id: number;
  logo: string;
  title: string;
}

// Create context with default values
export const ContextProvider = createContext<ContextType | null>(null);

// Default token
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.dHVzaGFyLnNhaW5pQGxvYmIuaW4.1InOHLHAMipL7u-8BHmP92fVbWADx9iiC9H0N1Cc6pc";

// Default data for card details
const defaultCardData: CardDetailsType = {
  thumbNailImage: "https://e0.pxfuel.com/wallpapers/847/217/desktop-wallpaper-android-luffy-ace-sabo-cool-ace-one-piece-thumbnail.jpg",
  mainImage: "https://www.shutterstock.com/image-photo/cartoon-picture-luffy-one-piece-600nw-2484250149.jpg",
  userName: "Ankit Hooda",
  subTitle: "There are many variations of passages",
  text: "<html>...</html>",
  id: 2,
  logo: "https://i.pinimg.com/originals/e7/9c/df/e79cdfc22bbbd73435ec83e9d1f05bc4.jpg",
  title: "One Piece"
};

// Define props type for the provider component
interface ContextProviderProps {
  children: ReactNode;
}

const ContextProviderComponent: React.FC<ContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(TOKEN);
  const [cardDetails, setCardDetails] = useState<CardDetailsType>(defaultCardData);
  const statusBarHeight = StatusBar.currentHeight;

  // Fetch token
  const getToken = useCallback(async () => {
    try {
      const res = await axios.post<{ token: string }>(GET_TOKEN_URL, { email: MY_EMAIL });
      setToken(res.data.token);
    } catch (error) {
      console.error("Error while generating Token:", error);
    }
  }, []);

  // Fetch card details
  const getCardDetails = useCallback(async () => {
    try {
      const res = await axios.get<{ content: CardDetailsType }>(GET_POST_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCardDetails(res.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    if (token) {
      getCardDetails();
    }
  }, [token, getCardDetails]);

  return (
    <ContextProvider.Provider value={{ token, cardDetails, statusBarHeight, getCardDetails }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextProviderComponent;
