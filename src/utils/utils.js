import {Alert} from 'react-native';

import youngju from '../assets/youngju.png';
import rose from '../assets/rose.png';
import daeun from '../assets/daeun.png';
import dogyun from '../assets/dogyun.png';
import gyubin from '../assets/gyubin.png';
import hyunju from '../assets/hyunju.png';
import hyunwoo from '../assets/hyunwoo.png';
import jaeho from '../assets/jaeho.png';

export const nickGenerator = () => {
  const a = ['lovely', 'cute', 'sexy'];
  const b = ['photo', 'water', 'dog'];
  const randomNumA = Math.floor(Math.random() * a.length);
  const randomNumB = Math.floor(Math.random() * b.length);
  return `${a[randomNumA]} ${b[randomNumB]}`;
};

export const notiError = (msg, error) => {
  console.log(msg, error);
  Alert.alert('에러!', msg);
};

export const convertToImage = lover => {
  const {season, name} = lover;
  if (season === 2) {
    switch (name) {
      case '오영주':
        return youngju;
      case '임현주':
        return hyunju;
      case '송다은':
        return daeun;
      case '김장미':
        return rose;
      case '김현우':
        return hyunwoo;
      case '김도균':
        return dogyun;
      case '이규빈':
        return gyubin;
      case '정재호':
        return jaeho;
      default:
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkG43Lxi-npn_-2eO9mGfThmwRAp5UbVrJ07hhKbUTiR9AeIva';
    }
  }
  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkG43Lxi-npn_-2eO9mGfThmwRAp5UbVrJ07hhKbUTiR9AeIva';
};

export const colors = {
  selectedEpi: '#b9adff',
  unselectedEpi: 'rgb(230, 230, 230)',
  black: 'black',
  white: 'white',
};
