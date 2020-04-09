import HearSignalMain from '../screens/HearSignalMain';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SideNavigation = () => (
  <Stack.Navigator initialRouteName="HearSignalMain">
    <Stack.Screen name="HearSignalMain" component={HearSignalMain} />
  </Stack.Navigator>
);
export default SideNavigation;
