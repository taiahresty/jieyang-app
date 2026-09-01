importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDopI3s9YpXVVUYdJNUOjDLIMm4riHcC4o",
  authDomain: "jieyang-app.firebaseapp.com",
  projectId: "jieyang-app",
  storageBucket: "jieyang-app.firebasestorage.app",
  messagingSenderId: "1023764652287",
  appId: "1:1023764652287:web:df656d3e5570b7be856cca"
});

const messaging = firebase.messaging();

// 背景接收推播並跳出橫幅、發出聲響與震動
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "公司系統通知";
  const notificationOptions = {
    body: payload.notification.body || "您有一筆新的工單交辦",
    icon: "https://raw.githubusercontent.com/google/material-design-icons/master/png/action/assignment/materialicons/192dp/2x/baseline_assignment_black_192dp.png",
    badge: "https://raw.githubusercontent.com/google/material-design-icons/master/png/action/assignment/materialicons/192dp/2x/baseline_assignment_black_192dp.png",
    vibrate: [200, 100, 200],
    data: {
      url: "/"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});