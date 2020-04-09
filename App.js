import 'react-native-gesture-handler'; // TODO: production에서 에러 날 가능성이 있음

import {AuthProvider, useLogin} from './src/context/AuthContext';
import React, {useEffect, useState} from 'react';

import {ApolloProvider} from 'react-apollo';
import NavController from './src/screens/NavController';
import {Text} from 'react-native';
import {ThemeProvider} from 'styled-components';
import client from './src/apollo/Apollo';
import theme from './src/theme';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';

const Container = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const {getItem: getIsAutoLoggedInItem} = useAsyncStorage('isLoggedIn');

  const preLoad = async () => {
    // await AsyncStorage.clear();
    const isLoggedInFS = await getIsAutoLoggedInItem();
    console.log('isLoggedInFS', isLoggedInFS);
    if (isLoggedInFS === null || isLoggedInFS === 'false') {
      // FS: From Storage
      try {
        setIsLoggedIn(false);
      } catch (e) {
        console.log('auto login error', e);
      }
    } else {
      setIsLoggedIn(true);
      // 나머지는 NavController 안에서 진행. login() 이 그 안에 있잖아. Login 화면 하나 만들어야겠다
    }

    setIsLoaded(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  return isLoaded && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <Text>Loading...</Text>
  );
};

export default Container;
