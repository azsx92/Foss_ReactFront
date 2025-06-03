import React, { useEffect, useState } from "react";
import "./App.css";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

function App() {
  const [fcmToken, setFcmToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState([
    { name: "news", subscribed: false },
    { name: "Foss", subscribed: false },
    { name: "alerts", subscribed: false }
  ]);
  const [topic, setTopic] = useState("");

  // 예약 알림 관련 state
  const [alarmDateTime, setAlarmDateTime] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationUrl, setNotificationUrl] = useState("");
  const [notificationImg, setNotificationImg] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 토큰 복원
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
    requestPermission();
    // eslint-disable-next-line
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
        setFcmToken(currentToken);
        console.log("FCM 토큰:", currentToken);
      } catch (error) {
        console.error("토큰 발급 오류:", error);
      }
    } else {
      console.log("알림 권한 허용 안됨");
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        email,
        password,
        name,
        fcmToken
      });
      setMessage("회원가입 완료: " + response.data.successContent);
    } catch (error) {
      setMessage("회원가입 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
        fcmToken
      });
      const token = response.data.accessToken;
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      setMessage("로그인 성공!");
    } catch (error) {
      setMessage("로그인 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  const handleLogout = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    setMessage("로그아웃 완료");
  };

  const subscribeTopic = async () => {
    if (!topic) {
      setMessage("구독할 토픽을 입력하세요");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/topic/subscribe",
        { topic },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage(response.data.successContent);
      const updatedTopics = [...topics];
      const index = updatedTopics.findIndex(t => t.name === topic);
      if (index >= 0) {
        updatedTopics[index].subscribed = true;
        setTopics(updatedTopics);
      }
    } catch (error) {
      setMessage("토픽 구독 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  const unsubscribeTopic = async () => {
    if (!topic) {
      setMessage("취소할 토픽을 입력하세요");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/topic/unsubscribe",
        { topic },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage(response.data.successContent);
      const updatedTopics = [...topics];
      const index = updatedTopics.findIndex(t => t.name === topic);
      if (index >= 0) {
        updatedTopics[index].subscribed = false;
        setTopics(updatedTopics);
      }
    } catch (error) {
      setMessage("토픽 구독 취소 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  const sendNotification = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/notification/token",
        {
          token: fcmToken,
          title: "토큰 테스트 알림",
          content: "FCM 토큰 테스트 메시지",
          url: "https://github.com/account",
          img: "https://avatars.githubusercontent.com/u/44886029?v=4",
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage("알림 전송 성공: " + response.data.successContent);
    } catch (error) {
      setMessage("알림 전송 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  const sendTopicNotification = async () => {
    if (!topic) {
      setMessage("토픽을 입력하세요");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/notification/topic",
        {
          topic,
          title: "토픽 알림",
          content: `${topic} 토픽에 대한 테스트 메시지입니다.`,
          url: "https://github.com/account",
          img: "https://avatars.githubusercontent.com/u/44886029?v=4"
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage("토픽 알림 전송 성공: " + response.data.successContent);
    } catch (error) {
      setMessage("토픽 알림 전송 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  // 예약 알림 핸들러
  const scheduleNotification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/alarm",
        {
          title: notificationTitle,
          content: notificationContent,
          url: notificationUrl,
          img: notificationImg,
          alarmDateTime: alarmDateTime
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage("알림 예약 성공: " + response.data.successContent);
    } catch (error) {
      setMessage("알림 예약 실패: " + (error.response?.data?.errorContent || error.message));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FCM 테스트</h1>

        {message && (
          <div className="message" style={{ margin: '10px', padding: '10px', backgroundColor: '#f0f0f0', color: '#333', borderRadius: '5px' }}>
            {message}
          </div>
        )}

        <div className="token-section">
          <h3>FCM 토큰</h3>
          <button onClick={requestPermission}>알림 권한 요청</button>
          {fcmToken && (
            <div className="token-display">
              <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{fcmToken}</p>
            </div>
          )}
        </div>

        {!accessToken ? (
          <div className="auth-section">
            <h3>회원가입 / 로그인</h3>
            <div className="form">
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="이름 (회원가입 시)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="buttons">
                <button onClick={handleRegister}>회원가입</button>
                <button onClick={handleLogin}>로그인</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="logged-in-section">
            <h3>토픽 구독 관리</h3>
            <div className="topic-form">
              <input
                type="text"
                placeholder="토픽명"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <div className="buttons">
                <button onClick={subscribeTopic}>구독하기</button>
                <button onClick={unsubscribeTopic}>구독취소</button>
              </div>
            </div>

            <h3>알림 전송 테스트</h3>
            <div className="buttons">
              <button onClick={sendNotification}>내 기기로 알림 보내기</button>
              <button onClick={sendTopicNotification}>토픽으로 알림 보내기</button>
            </div>

            <h3>알림 예약</h3>
            <div className="schedule-form">
              <input
                type="datetime-local"
                value={alarmDateTime}
                onChange={(e) => setAlarmDateTime(e.target.value)}
                style={{ margin: '5px', padding: '8px' }}
              />
              <input
                type="text"
                placeholder="알림 제목"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                style={{ margin: '5px', padding: '8px' }}
              />
              <input
                type="text"
                placeholder="알림 내용"
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
                style={{ margin: '5px', padding: '8px' }}
              />
              <input
                type="text"
                placeholder="이미지 URL"
                value={notificationImg}
                onChange={(e) => setNotificationImg(e.target.value)}
                style={{ margin: '5px', padding: '8px' }}
              />
              <input
                type="text"
                placeholder="연결 URL"
                value={notificationUrl}
                onChange={(e) => setNotificationUrl(e.target.value)}
                style={{ margin: '5px', padding: '8px' }}
              />
              <button
                onClick={scheduleNotification}
                style={{ margin: '5px', padding: '8px 16px' }}
              >
                알림 예약
              </button>
            </div>

            <button onClick={handleLogout} style={{ marginTop: '20px' }}>로그아웃</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
