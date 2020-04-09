import {Alert, View, Animated, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';

import styled from 'styled-components';
import {LOVERS} from '../apollo/queries/lover';
import {CREATE_ARROW} from '../apollo/queries/arrow';
import {EPISODES, UPDATE_ARROWS_OF_EPI} from '../apollo/queries/episode';
import {BOARD, UPDATE_BOARD} from '../apollo/queries/board';
import {colors} from '../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Svg, Line} from 'react-native-svg';
import {LOVELINE_STATUS} from '../apollo/queries/loveline';
import Board from '../components/Board';
import {Lover} from '../interface';

import Swiper from 'react-native-swiper';

// const AnimatedSvg = Animated.createAnimatedComponent(Svg);
// const AnimatedLine = Animated.createAnimatedComponent(Line);

const Container = styled.View`
  flex: 1;
  /* background-color: green; */
`;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const EpisodesContainer = styled.ScrollView.attrs({
  horizontal: true,
})`
  padding: 0px 5px;
  flex: 0.2; /* ?? TODO: */
`;

const EpiContainer = styled.View`
  /* flex-direction: row; */
  /* background-color: pink; */
`;

const Episode = styled.TouchableOpacity`
  width: 100px;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isSelectedEpi ? colors.selectedEpi : colors.unselectedEpi};
  margin: 0px 5px 0px 0px;
  justify-content: center;
  align-items: center;
`;

const EpisodeText = styled.Text`
  color: white;
  font-size: 18px;
`;

const LoveLineButton = styled.TouchableOpacity`
  width: 95%;
  height: 30px;
  border-radius: 20px;
  background-color: skyblue;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  align-self: center;
`;

const LoveLineText = styled.Text`
  color: white;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  /* width: 100%;
  height: 70px; */
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`;

const InfoText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
`;

const CancelButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled.TouchableOpacity``;

const SaveButtonText = styled.Text``;

const ActivityIndicator = styled.ActivityIndicator``;

interface Props {}

const Home = ({navigation}: Props) => {
  // State
  const [isLoaded, setIsLoaded] = useState(true);
  const [episodes, setEpisodes] = useState(null);
  const [selectedEpi, setSelectedEpi] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null); // 딱 에피가 이제 있는데, 그에 대한 보드를 만들어줘야 하는데, 유저에서 일단 있는지 찾아봐 그리고 없으면
  const [lovers, setLovers] = useState(null);
  const [selectedFromLovers, setSelectedFromLovers] = useState([]);
  const [selectedToLovers, setSelectedToLovers] = useState([]);
  const [chooser, setChooser] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [registerLovelineMode, setRegisterLovelineMode] = useState(false);
  const [fetchEpisodes, setFetchEpisodes] = useState(true);
  const [fetchBoard, setFetchBoard] = useState(true);
  const [seeRealArrows, setSeeRealArrows] = useState(false);
  const [lovelineStatus, setLovelineStatus] = useState(null);
  const [fetchLovelineStatus, setFetchLovelineStatus] = useState(false);

  // Query
  const {loading: isLovelinStatusLoading, data: lovelineStatusData} = useQuery(
    LOVELINE_STATUS,
    {
      variables: {episodeId: selectedEpi?.id, boardId: selectedBoard?.id},
      skip: !fetchLovelineStatus || !selectedEpi || !selectedBoard, // fetch만 한다고 해서 잘 되는게 아니라 변수로 들어가는애도 있어야해 그래서 이중조건을 해준거야
      fetchPolicy: 'network-only',
    },
  );
  const {loading: isLoverLoading, data: loversData} = useQuery(LOVERS);
  const {loading: isEpisodeLoading, data: episodesData} = useQuery(EPISODES, {
    skip: !fetchEpisodes,
    fetchPolicy: 'network-only',
  });
  if (!isEpisodeLoading && episodesData) {
    // console.log('💋episode', isEpisodeLoading, episodesData);
  }

  const {loading: isBoardLoading, data: boardData} = useQuery(BOARD, {
    variables: {episodeId: selectedEpi?.id},
    skip: !fetchBoard || !selectedEpi,
    fetchPolicy: 'network-only', // refetch를 하면 이걸 조심해야 한다.
  });
  if (!isBoardLoading && boardData) {
    // console.log('🩱board', isBoardLoading, boardData);
  }
  // Mutation
  const [createArrowMutation] = useMutation(CREATE_ARROW, {
    variables: {
      boardId: selectedBoard?.id,
      fromId: chooser?.id,
      toId: chosen?.id,
    },
  });
  const [updateArrowsOfEpiMutation] = useMutation(UPDATE_ARROWS_OF_EPI, {
    variables: {
      episodeId: selectedEpi?.id,
      fromId: chooser?.id,
      toId: chosen?.id,
    },
  });
  const [updateBoardMutation] = useMutation(UPDATE_BOARD, {
    variables: {
      boardId: selectedBoard?.id,
      fromIds: selectedFromLovers.map((lover: Lover) => lover.id),
      toIds: selectedToLovers.map((lover: Lover) => lover.id),
    },
  });

  // useEffect
  useEffect(() => {
    if (!isLovelinStatusLoading && lovelineStatusData) {
      setLovelineStatus(lovelineStatusData.lovelineStatus);
      setFetchLovelineStatus(false);
    }
  }, [lovelineStatusData]);

  useEffect(() => {
    // 에피가 바뀌면 skip에 따라 자동으로 board 쿼리가 실행되므로 이렇게!
    if (!isLoverLoading && loversData) {
      setLovers(loversData.lovers);
      console.log('👩🏻‍🦰', loversData.lovers);
    }
  }, [loversData, isLoverLoading]);

  useEffect(() => {
    // 에피가 바뀌면 skip에 따라 자동으로 board 쿼리가 실행되므로 이렇게!
    if (!isBoardLoading && boardData) {
      setSelectedBoard(boardData.board);
      setFetchBoard(false);
      setFetchLovelineStatus(true);
    }
  }, [boardData, isBoardLoading]);

  // 초기 epi[0]이 설정되면 fetchBoard를 하기 위함
  useEffect(() => {
    setFetchBoard(true);
  }, [selectedEpi]);

  useEffect(() => {
    if (!isEpisodeLoading && episodesData) {
      setEpisodes(episodesData.episodes);
      setFetchEpisodes(false);

      // selectedEpi를 바꾸는법... selectedEpi

      // 초기에 에피소드 1화로 설정.
      if (selectedEpi === null) {
        setSelectedEpi(episodesData.episodes[0]);
      } else {
        setSelectedEpi((e) => episodesData.episodes[e.number - 1]);
      }
    }
  }, [episodesData, isEpisodeLoading]);

  useEffect(() => {
    if (registerLovelineMode) {
      updateArrowsOfEpiFunc();
    } else {
      createArrowFunc();
    }
  }, [chooser, chosen]);

  const updateArrowsOfEpiFunc = async () => {
    if (selectedEpi && chooser && chosen) {
      const {
        data: {updateArrowsOfEpi},
      } = await updateArrowsOfEpiMutation();
      if (updateArrowsOfEpi === true) {
        setFetchEpisodes(true);
      }
      setChooser(null);
      setChosen(null);
    }
  };

  const createArrowFunc = async () => {
    if (selectedBoard && chooser && chosen) {
      const {
        data: {createArrow},
      } = await createArrowMutation();
      if (createArrow) {
        setFetchBoard(true);
        setChooser(null);
        setChosen(null);
      }
    }
  };
  // funcs
  const handleChoice = async (lover: Lover) => {
    const fromLen = selectedFromLovers.length;
    const toLen = selectedToLovers.length;

    if (fromLen === toLen) {
      const newLovers = selectedFromLovers.slice(0);
      newLovers.push(lover);
      setSelectedFromLovers(newLovers);
    } else if (fromLen === toLen + 1) {
      const newLovers = selectedToLovers.slice(0);
      newLovers.push(lover);
      setSelectedToLovers(newLovers);
    } else {
      Alert.alert('length가 이상해요');
    }

    // if (!chooser && !chosen) {
    //   setChooser(lover);
    // } else if (chooser && !chosen) {
    //   if (chooser.id === lover.id) {
    //     // Alert.alert('다른 사람을 선택해주세요!');
    //     return;
    //   } else if (chooser.gender === lover.gender) {
    //     // Alert.alert('같은 성별은 선택할 수 없어요!');
    //     return;
    //   } else {
    //     setChosen(lover); // createArrowFunc
    //   }
    // }
  };

  const handleCancel = async () => {
    const fromLen = selectedFromLovers.length;
    const toLen = selectedToLovers.length;

    if (fromLen === 0 && toLen === 0) {
      return;
    }

    if (fromLen === toLen) {
      const newLovers = selectedToLovers.filter(
        (lover: Lover, index: number) => index < toLen - 1,
      );
      setSelectedToLovers(newLovers);
    } else if (fromLen === toLen + 1) {
      const newLovers = selectedFromLovers.filter(
        (lover: Lover, index: number) => index < fromLen - 1,
      );
      setSelectedFromLovers(newLovers);
    } else {
      Alert.alert('length가 이상해요');
    }
  };

  const handleSave = async () => {
    const {
      data: {updateBoard},
    } = await updateBoardMutation();
    // console.log('updateBoard', updateBoard);
    setSelectedFromLovers([]);
    setSelectedToLovers([]);
  };

  // const convertToInfoText = () => {
  //   if (!chooser && !chosen) {
  //     return '러브라인을 맞출 입주자를 클릭해주세요';
  //   } else if (chooser && !chosen) {
  //     return `${chooser.name}의 러브라인은?`;
  //   } else if (chooser && chosen) {
  //     return `${chooser.name}의 러브라인은? ${chosen.name}`;
  //   }
  // };

  const handleSeeRealArrows = async () => {
    // 실시간으로 epi에 다 있으니까 그걸 띄워주기만 하면 됨. 띄워주는걸 seeRealArrows true false로 해서 애니메이션 보여주면 될듯?
    setSeeRealArrows((a) => !a);
  };

  const handleSeeOtherLoveline = () => {
    setFetchLovelineStatus(true);
  };

  // const initWidth = useRef(new Animated.Value(0)).current;
  // const initHeight = useRef(new Animated.Value(0)).current;

  // let animateWidth = initWidth.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0', '100'],
  // });
  // let animateHeight = initHeight.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0', '100'],
  // });

  useEffect(() => {
    // Animated.timing(
    //   // Animate over time
    //   initWidth,
    //   {
    //     toValue: 100,
    //     duration: 500,
    //     useNativeDriver: true,
    //   },
    // ).start();
    // Animated.timing(
    //   // Animate over time
    //   initHeight,
    //   {
    //     toValue: 100,
    //     duration: 500,
    //     useNativeDriver: true,
    //   },
    // ).start();
  }, []);

  return lovers && episodes && selectedBoard && lovelineStatus ? (
    <Container>
      {/* <AnimatedSvg height="100" width="100">
        <AnimatedLine
          x1={0}
          y1={0}
          x2={animateWidth}
          y2={animateHeight}
          stroke="red"
          strokeWidth="2"
        />
      </AnimatedSvg> */}
      <Text>
        나와 같은 사람: ({lovelineStatus.sameNum}/{lovelineStatus.totalNum})
      </Text>
      <TouchableOpacity onPress={handleSeeOtherLoveline}>
        <Text>다른 사람 보러가기 Go (지금은 위에거 refetch)</Text>
      </TouchableOpacity>

      <EpisodesContainer>
        {episodes.map((episode) => {
          const {number, id} = episode;
          return (
            <EpiContainer key={id}>
              <Episode
                onPress={() => setSelectedEpi(episode)}
                isSelectedEpi={number === selectedEpi.number}>
                <EpisodeText>#{number}</EpisodeText>
              </Episode>
            </EpiContainer>
          );
        })}
      </EpisodesContainer>
      <LoveLineButton onPress={handleSeeRealArrows}>
        <LoveLineText>러브라인 결과 확인</LoveLineText>
      </LoveLineButton>

      <Board
        {...lovers}
        handleChoice={handleChoice}
        fetchBoard={fetchBoard}
        seeRealArrows={seeRealArrows}
        selectedEpi={selectedEpi}
        selectedBoard={selectedBoard}
        handleDeleteArrow={() => setFetchEpisodes(true)}
      />

      <InfoContainer>
        {/* <InfoText>{convertToInfoText()}</InfoText> */}
        <InfoText>
          From: {selectedFromLovers.map((lover: Lover) => lover.name)}
        </InfoText>
        <InfoText>
          To: {selectedToLovers.map((lover: Lover) => lover.name)}
        </InfoText>
        <CancelButton onPress={handleCancel}>
          <InfoText>실행취소</InfoText>
          <MaterialIcons size={20} name={'clear'} color={colors.black} />
        </CancelButton>
        <SaveButton onPress={handleSave}>
          <SaveButtonText>Save</SaveButtonText>
        </SaveButton>
      </InfoContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <ActivityIndicator color={'white'} />
    </LoadingContainer>
  );
};

export default Home;
