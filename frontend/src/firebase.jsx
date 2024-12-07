// Use named imports from Firebase
import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBijFmGoeBzU0ZNdua43BxjzFe9xm03idI",
  authDomain: "btnchat-696a3.firebaseapp.com",
  projectId: "btnchat-696a3",
  storageBucket: "btnchat-696a3.firebasestorage.app",
  messagingSenderId: "450917340205",
  appId: "1:450917340205:web:7863455549ad54e3b454a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export {messaging, getToken};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
