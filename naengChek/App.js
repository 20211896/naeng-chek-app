import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './page/home';    
import Ingredient from './page/ingredient';    
import MyPage from './page/myPage.js'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ingredient" component={Ingredient} />
        <Stack.Screen name="MyPage" component={MyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}