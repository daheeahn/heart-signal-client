import Home from '../screens/Home';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default MainNavigation;
