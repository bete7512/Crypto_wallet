importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAbBqLWak5E8rxuLawqnCkz7H5eIsPvtb8",
  authDomain: "rensys-2d88e.firebaseapp.com",
  databaseURL:
    "https://rensys-2d88e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rensys-2d88e",
  storageBucket: "rensys-2d88e.appspot.com",
  messagingSenderId: "588059231593",
  appId: "1:588059231593:web:730e400871701796d0a9f8",
});

const messaging = firebase.messaging();

// self.addEventListener('notificationclick', function(event) {
//   // console.log('On notification click: ', event.notification.tag);
//   // event.notification.close();
//   // Handle notification click event here
// });

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});