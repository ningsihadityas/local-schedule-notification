import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import NotifService from './service/NotifService';

export default class App extends Component {
  onRegister(token) {
    this.setState({ registerToken: token.token, fcmRegistered: true });
  }

  onNotif(notif) {
    // when open notif
  }

  constructor(props) {
    super(props);

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
  }

  componentDidMount() {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,

        // android options
        startOnBoot: true, // start background after reseter
        stopOnTerminate: false,
        enableHeadless: true, // enbale background
        forceAlarmManager: true, // change jobscheduler API to AlarmManager API ( more accurate time & no need network connection)
      },
      async (taskId) => {
        // This is the fetch-event callback.
        console.log('[BackgroundFetch] taskId: ', taskId);

        //react native background configure in foreground (check index.js for background)
        let date = await new Date();
        const hours = await date.getHours();
        const minutes = await date.getMinutes();

        if (hours === 10 && minutes <= 25) {
          this.notif.pushNotif(date);
          console.log('notif push');
        } else {
          console.log('dont push notif');
        }

        // Finish, providing received taskId.
        BackgroundFetch.finish(taskId);
      }
    );
  }

  render() {
    return (
      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          Schedule notification at particular time
        </Text>
        <Text style={styles.text}>Works both in iOS and Android</Text>
        <Text style={styles.text}>Set at 10-10.25 ( app.js and index.js)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: '#696969',
    paddingHorizontal: 50,
    fontSize: 15,
  },
});
