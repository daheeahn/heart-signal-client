import {GET_LOCAL_DATA, GET_MOVIES} from '../apollo/queries/stick';
import {Text, TouchableOpacity, View} from 'react-native';

import BasicText from '../components/BasicText';
import {BasicView} from '../components/BasicView';
import React from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import {useQuery} from '@apollo/react-hooks';

const Sub = () => {
  const {loading: l1, data: d1} = useQuery(GET_MOVIES);
  const {loading: l2, data: d2} = useQuery(GET_LOCAL_DATA);
  const client = useApolloClient();
  console.log(l1, d1);
  console.log(l2, d2);

  return (
    <TouchableOpacity
      onPress={() => {
        // toggle isLoggedIn
        client.writeData({data: {isLoggedIn: !d2.isLoggedIn}});
        // client.writeData({data: {isLoggedIn: !d2.isLoggedIn}});
        // writeData 말고 mutation 이용하는거 해보기
      }}>
      <BasicText />
    </TouchableOpacity>
  );
};

export default Sub;
