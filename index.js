import 'react-native-gesture-handler';

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

AppRegistry.registerComponent(appName, () => codePush(App));
