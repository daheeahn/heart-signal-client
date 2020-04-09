import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {DELETE_ARROW} from '../apollo/queries/arrow';

const Arrow = ({id, from, to, handleDeleteArrow, disabled}) => {
  const [deleteArrowMutation] = useMutation(DELETE_ARROW, {
    variables: {
      arrowId: id,
    },
  });

  return (
    <>
      <Text key={id}>
        {from.name} -> {to.name}
      </Text>
      <TouchableOpacity
        disabled={disabled}
        onPress={async () => {
          handleDeleteArrow();
          const result = await deleteArrowMutation();
          if (result) {
            console.log('삭제 성공', id);
          }
        }}>
        <Text>삭제</Text>
      </TouchableOpacity>
    </>
  );
};

export default Arrow;
