import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './page/home';
import Ingredient from './page/ingredient';
import MyPage from './page/myPage';
import Login from './page/login';
import IdFind from './page/idFind';
import UserData from './page/signup/userData';
import UserBirthDate from './page/signup/userBirthDate';
import UserPhone from './page/signup/userPhone';
import UserIdentify from './page/signup/userIdentify';
import UserEmail from './page/signup/userEmail';
import UserPw from './page/signup/userPw';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ingredient" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="IdFind" component={IdFind} />
          <Stack.Screen name="UserData" component={UserData} />
          <Stack.Screen name="UserBirthDate" component={UserBirthDate} />
          <Stack.Screen name="UserPhone" component={UserPhone} />
          <Stack.Screen name="UserIdentify" component={UserIdentify} />
          <Stack.Screen name="UserEmail" component={UserEmail} />
          <Stack.Screen name="UserPw" component={UserPw} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Ingredient" component={Ingredient} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
