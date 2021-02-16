import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationHandler from './NotifHandler';
import { Platform } from 'react-native';

export default class NotifService {
  constructor(onRegister, onNotification) {
    //create notification channel to identify notification (android property)
    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    PushNotification.getChannels(function (channels) {
      console.log('[CHANNEL]:', channels);
    });
  }

  createDefaultChannels() {
    // android properties

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default channel',
        channelDescription: 'A default channel', // (optional) default: undefined.
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel CHECKIN returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) =>
      console.log('InitialNotication:', notification)
    );
  }

  pushNotif = (date) => {
    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      channelId: 'default-channel-id',
      date: date,

      /* iOS and Android properties */
      id: 2, // set id, so the notification won't show multiple times at one time
      message: 'Hello, this is your notification!', // (required)
      allowWhileIdle: true,
    });
  };

  deleteChannel() {
    PushNotification.deleteChannel('default-channel-id');
    console.log('channel already delete');
  }

  cancelAll() {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  }
}
