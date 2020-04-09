import AuthNavigation from './AuthNavigation';
import Home from '../screens/Home';
import MainNavigation from './MainNavigation';
import React from 'react';
import SideNavigation from './SideNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const RootNavigation = () => (
  <Drawer.Navigator initialRouteName="MainNavigation">
    <Drawer.Screen name="MainNavigation" component={MainNavigation} />
    <Drawer.Screen name="SideNavigation" component={SideNavigation} />
  </Drawer.Navigator>
);

export default RootNavigation;
