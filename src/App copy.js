import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

function App() {
  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission() {
    console.log("알림 권한 요청...");
    
    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_VAPID_KEY
        });
      // 서버에 토큰 전송
      await fetch('http://localhost:8080/api/notification/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: currentToken }),
      });
        // 서버에 토큰 넘겨서 관리
        console.log("currentToken:", currentToken);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    } else {
      console.log("알림 권한 허용 안됨");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={requestPermission}>
          알림 권한 요청
        </button>
      </header>
    </div>
  );
}

export default App;
