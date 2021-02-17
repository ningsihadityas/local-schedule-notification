This React Native App has local daily schedule notifications as a reminder at a particular time everyday, both on iOS and Android.

The notification is set locally in index.js (background) and app.js (foreground) 

I use two libraries:

- [react-native-push-notification](https://github.com/zo0r/react-native-push-notification.git)
  
     I use this library to do local schedule notifications, and it works perfectly on Android and iOS. I also tested remote notifications using firebase cloud messaging, and it also worked smoothly. 
   
- [react-native-background-fetch](https://github.com/transistorsoft/react-native-background-fetch.git)
    
     I use this library to perform background tasks and display notifications even when the app is closed. And at this time, it is the only working library for iOS and Android. This background task is only fetch at a minimum interval 15 minutes by default. So I created reminders between 10-10.25 to ensure that the background task was fetched while within that interval. And it will push a notification everyday.
