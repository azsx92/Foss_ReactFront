// src/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

console.log("projectId:", process.env.REACT_APP_PROJECT_ID);
console.log("apiKey:", process.env.REACT_APP_API_KEY);
console.log("authDomain:", process.env.REACT_APP_AUTH_DOMAIN);
console.log("storageBucket:", process.env.REACT_APP_STORAGE_BUCKET);
console.log("messagingSenderId:", process.env.REACT_APP_MESSAGING_SENDER_ID);
console.log("appId:", process.env.REACT_APP_APP_ID);
console.log("vapidKey:", process.env.REACT_APP_VAPID_KEY);

// 환경변수(.env)에서 Firebase 설정값을 불러옵니다.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    vapidKey: process.env.REACT_APP_VAPID_KEY
};
  
// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);

// FCM Messaging 인스턴스 생성
const messaging = getMessaging(firebaseApp);

export { messaging };