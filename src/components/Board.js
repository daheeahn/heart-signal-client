import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {convertToImage} from '../utils/utils';
import Arrow from './Arrow';
import {Lover} from '../interface';

const LoverContainer = styled.View`
  flex-direction: row;
  /* background-color: #f2f7ff; */
  background-color: red;
`;

const FemaleLoverContainer = styled.View`
  flex: 1;
`;

const MaleLoverContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const ImageContainer = styled.TouchableOpacity`
  margin: 5px;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

const LoverComponent = (props) => (
  <ImageContainer {...props}>
    <Image source={props.image} />
  </ImageContainer>
);

const Board = ({
  females,
  males,
  selectedEpi,
  selectedBoard,
  fetchBoard = false,
  seeRealArrows = false,
  handleChoice = () => null,
  handleDeleteArrow = () => null,
  disabled = false,
}) => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {fetchBoard ? (
          <Text>loading...</Text>
        ) : seeRealArrows ? (
          <View>
            <Text>실제 러브라인</Text>
            {selectedEpi?.arrows?.map((arrow) => (
              <Arrow
                key={arrow.id}
                {...arrow}
                handleDeleteArrow={handleDeleteArrow}
                disabled={disabled}
              />
            ))}
          </View>
        ) : (
          <View style={{marginRight: 20}}>
            <Text>예상 러브라인</Text>
            {selectedBoard?.arrows?.map((arrow) => (
              <Arrow
                key={arrow.id}
                {...arrow}
                handleDeleteArrow={handleDeleteArrow}
                disabled={disabled}
              />
            ))}
          </View>
        )}
      </View>
      <LoverContainer>
        <FemaleLoverContainer>
          {females.map((lover: Lover) => (
            <LoverComponent
              key={lover.id}
              onPress={() => handleChoice(lover)}
              image={convertToImage(lover)}
              disabled={disabled}
            />
          ))}
        </FemaleLoverContainer>
        <MaleLoverContainer>
          {males.map((lover: Lover) => (
            <LoverComponent
              onPress={() => handleChoice(lover)}
              image={convertToImage(lover)}
              key={lover.id}
              disabled={disabled}
            />
          ))}
        </MaleLoverContainer>
      </LoverContainer>
    </View>
  );
};

export default Board;
