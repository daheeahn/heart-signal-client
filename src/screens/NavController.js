import AuthNavigation from '../navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootNavigation from '../navigations/RootNavigation';
import {useIsLoggedIn} from '../context/AuthContext';

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
