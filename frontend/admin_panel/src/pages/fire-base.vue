<template>
  <div>
    
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted } from "vue";
import firebase from "firebase/app";
import "firebase/messaging";

const messaging = ref(null);
const firebaseConfig = {
  apiKey: "AIzaSyAbBqLWak5E8rxuLawqnCkz7H5eIsPvtb8",
  authDomain: "rensys-2d88e.firebaseapp.com",
  databaseURL:
    "https://rensys-2d88e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rensys-2d88e",
  storageBucket: "rensys-2d88e.appspot.com",
  messagingSenderId: "588059231593",
  appId: "1:588059231593:web:730e400871701796d0a9f8",
};

onMounted(async () => {
  const app = firebase.initializeApp(firebaseConfig);
  messaging.value = app.messaging();
  try {
    await messaging.value.requestPermission();
    console.log("Notification permission granted");
    const token = await messaging.value.getToken({
      vapidKey: 'BB-6oNzp7ywyFtJ8XCE-608MHPLVtjHvoKInzI4gMJ37QWqv-llBK67Yu0Tny3HVuUEemAADOOAV7NpV6lfhXHY'
    });
    console.log("FCM token:", token);
  } catch (err) {
    console.log("Unable to get permission to notify.", err);
  }
});



</script>

<style></style>
