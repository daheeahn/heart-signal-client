import {GET_LOCAL_DATA, GET_MOVIES} from '../apollo/queries/stick';

import React from 'react';
import {Text} from 'react-native';
import {useApolloClient} from '@apollo/react-hooks';
import {useQuery} from '@apollo/react-hooks';

const BasicText = () => {
  const {loading: l2, data: d2} = useQuery(GET_LOCAL_DATA);
  console.log('hi', l2, d2);
  return (
    <>
      <Text>{'hi'}</Text>
      <Text>{d2.isLoggedIn ? 'true' : 'false'}</Text>
    </>
  );
};

export default BasicText;
