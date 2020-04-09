import React from 'react';
import SignUp from '../screens/Signup';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator initialRouteName="SignUp">
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default AuthNavigation;
