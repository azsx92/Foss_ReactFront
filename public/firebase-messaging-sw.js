// public/firebase-messaging-sw.js

// 서비스워커 등록 (백그라운드 webpush)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("firebase-messaging-sw.js");
  }
  
  // install 이벤트
  self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
  });
  
  // activate 이벤트
  self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
  });
  
  // push 이벤트 (푸시 메시지 수신)
  self.addEventListener("push", function (e) {
    if (!e.data.json()) return;
    const resultData = e.data.json().notification;
    const resultURL = e.data.json().data.click_action;
  
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.image,
      data: { click_action: resultURL },
    };
  
    // 알림 표시
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  // 알림 클릭 이벤트
  self.addEventListener("notificationclick", function (event) {
    const resultURL = event.notification.data.click_action;
    event.notification.close();
    event.waitUntil(
      clients.openWindow(resultURL)
    );
  });
  