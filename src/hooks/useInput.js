import React, {useState} from 'react';

const useInput = initialVal => {
  const [value, setValue] = useState(initialVal);
  const onChangeText = text => {
    setValue(text);
  };
  return {value, setValue, onChangeText};
};

export default useInput;
