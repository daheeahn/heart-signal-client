import {resolvers, typeDefs} from './resolvers';

import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import AsyncStorage from '@react-native-community/async-storage';

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: true,
  },
});

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000',
  typeDefs, // 로컬상태
  resolvers, // 로컬상태
  request: async operation => {
    // 이 함수가 리턴하는 값은 요청마다 추가도ㅔㅐ. 이함수가 매 요청마다 호출되는거지.
    // 매 요청을 중간에 가로채는거야.
    const token = await AsyncStorage.getItem('jwt');
    console.log('👨‍❤️‍💋‍👨', token);
    return operation.setContext({
      // 요청마다 이 함수가 실행돼.
      headers: {Authorization: `Bearer ${token}`},
    });
  },
});

export default client;
