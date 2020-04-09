import {Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const BasicView = ({navigation, bgColor, content, textColor}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor || '#fff',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: textColor || 'black', fontSize: 30}}>
        {content || '내용 없음'}
      </Text>
    </View>
  );
};
