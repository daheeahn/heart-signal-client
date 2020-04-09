import React, {useEffect, useState} from 'react';
import {TextInput, Alert} from 'react-native';

import {CREATE_USER} from '../apollo/queries/user';
import constants from '../constants';
import {notiError} from '../utils/utils';
import styled from 'styled-components';
import {useMutation} from '@apollo/react-hooks';
import useInput from '../hooks/useInput';
import AsyncStorage from '@react-native-community/async-storage';
import {useLogin} from '../context/AuthContext';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const SignupContainer = styled.View`
  width: ${constants.width / 2};
  background-color: ${props => 'green'};
  border-radius: 10px;
`;

const SignupText = styled.Text`
  padding: 10px;
  text-align: center;
  color: #333;
  font-weight: 600;
`;

const ActivityIndicator = styled.ActivityIndicator`
  padding: 10px;
  color: white;
`;

const Signup = () => {
  const logIn = useLogin();
  const {value: genderVal, onChangeText: onChangeGenderText} = useInput(
    'FEMALE',
  );
  const {value: ageVal, onChangeText: onChangeAgeText} = useInput('23');
  // autoLogin이 안된 상태. 앱 처음 설치한 유저만 해당
  const [createUserMutation, {loading, error}] = useMutation(CREATE_USER, {
    variables: {
      gender: genderVal,
      age: parseInt(ageVal), // TODO: 실제 입력값 parseInt
    },
  });

  const handleSignup = async () => {
    try {
      if (genderVal === '' || ageVal === '') {
        Alert.alert('성별과 나이를 모두 적어주세요!');
        return;
      }
      const {
        data: {createUser},
      } = await createUserMutation();
      console.log('handleSignup token', createUser);
      if (createUser) {
        logIn(createUser);
      }
    } catch (e) {
      notiError('handleSignup error', e);
    }
  };

  useEffect(() => {
    // autoLogin();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <>
          <TextInput value={genderVal} onChangeText={onChangeGenderText} />
          <TextInput
            value={ageVal}
            onChangeText={onChangeAgeText}
            keyboardType={'numeric'}
            maxLength={2}
          />
          <Touchable disabled={loading} onPress={handleSignup}>
            <SignupContainer>
              <SignupText>Create User</SignupText>
            </SignupContainer>
          </Touchable>
        </>
      )}
    </View>
  );
};

export default Signup;
