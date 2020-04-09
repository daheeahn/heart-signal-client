import React, {createContext, useContext, useState} from 'react';

import {notiError} from '../utils/utils';
import {useAsyncStorage} from '@react-native-community/async-storage';

// 변수를 포함하는 object 라고 생각하면 쉬움
export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const {
    getItem: getIsLoggedInItem,
    setItem: setIsLoggedInItem,
  } = useAsyncStorage('isLoggedIn');
  const {getItem: getJwtItem, setItem: setJwtItem} = useAsyncStorage('jwt');

  const login = async token => {
    console.log('login이 왔으요', token);
    try {
      await setIsLoggedInItem('true');
      await setJwtItem(token);
      setIsLoggedIn(true);
    } catch (error) {
      notiError('login authcontext error', error);
    }
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogin = () => {
  const {login} = useContext(AuthContext);
  return login;
};
