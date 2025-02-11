// In App.js in a new project

import React, { useState, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation';
import axios from 'axios';
import { GET_TOKEN_URL, MY_EMAIL } from './config/constants';
import { StatusBar } from 'react-native';
import ContextProviderComponent from './store/ContextProvider';

export default function App() {
  return (
    <ContextProviderComponent>
      <StatusBar backgroundColor={"transparent"} translucent={true} networkActivityIndicatorVisible={false} hidden={true}/>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ContextProviderComponent>
  );
}