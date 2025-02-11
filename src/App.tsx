// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation';
import { StatusBar } from 'react-native';
import ContextProviderComponent from './store/ContextProvider';

export default function App() {
  return (
    <ContextProviderComponent>
      <StatusBar backgroundColor={"transparent"} translucent={true}/>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ContextProviderComponent>
  );
}