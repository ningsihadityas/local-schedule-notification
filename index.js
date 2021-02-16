import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import NotifService from './src/service/NotifService';

//react native background configure in background ( check app.js for foreground)
let MyHeadlessTask = async (event) => {
  let taskId = event.taskId;

  console.log('[Index BackgroundFetch HeadlessTask] start', taskId);

  let date = await new Date();
  const hours = await date.getHours();
  const minutes = await date.getMinutes();

  const ns = new NotifService();

  if (hours === 10 && minutes <= 25) {
    ns.pushNotif(date);
    console.log('notif push');
  } else {
    console.log('dont push notif');
  }

  BackgroundFetch.finish(taskId);
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
