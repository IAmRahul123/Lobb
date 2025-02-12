import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { GET_POST_URL, GET_TOKEN_URL, MY_EMAIL } from '../config/constants';
import { CardDetailsType } from '../@types/cardTypes';

// Define types for context values
interface ContextType {
  token: string;
  cardDetails: CardDetailsType;
  statusBarHeight: number | undefined;
  getCardDetails: () => Promise<void>;
}

// Create context
export const ContextProvider = createContext<ContextType | null>(null);
interface ContextProviderProps {
  children: ReactNode;
}

const ContextProviderComponent: React.FC<ContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [cardDetails, setCardDetails] = useState<CardDetailsType>();
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
