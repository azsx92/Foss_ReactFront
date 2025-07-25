## FCM(Firebase Cloud Messaging) 풀스택 프로젝트
- React + SpringBoot + FCM을 활용한 실시간 푸시 알림 시스템

### 📋 프로젝트 개요
- React 프론트엔드와 SpringBoot 백엔드를 연동하여 FCM 기반 푸시 알림 시스템을 구축. 토큰/토픽 관리부터 실시간 알림 전송까지 전체 플로우를 직접 구현하여 풀스택 개발 역량을 증명한 프로젝트입니다.

### 개발 동기:
- Firebase의 무료 티어와 크로스 플랫폼 지원을 활용해 실무에서 많이 사용되는 푸시 알림 시스템을 학습하고, 프론트-백엔드 연동 경험을 쌓기 위함.
---

## 🖥️ React 프론트엔드 주요 화면 및 기능

- **FCM 토큰 실시간 표시 및 권한 요청**
    - 사용자가 버튼 클릭 시 브라우저 알림 권한을 요청하고, 발급된 FCM 토큰을 실시간으로 확인할 수 있습니다.
- **토픽 구독/구독 해제 UI**
    - 입력창에 토픽명을 입력하고, 구독 또는 구독 취소 버튼으로 토픽 관리가 가능합니다.
    - 직관적인 인터페이스로 여러 토픽을 쉽게 관리할 수 있습니다.
- **알림 전송 테스트**
    - "내 기기로 알림 보내기" 및 "토픽으로 알림 보내기" 버튼을 통해, 개별 디바이스 또는 토픽 구독자 전체에게 테스트 알림을 전송할 수 있습니다.
- **알림 예약 기능**
    - 날짜/시간, 제목, 내용, 이미지, URL 등 다양한 정보를 입력해 예약 알림을 등록할 수 있습니다.
    - 예약된 시간에 맞춰 자동으로 푸시 알림이 발송됩니다.
- **사용자 친화적 UI**
    - 모든 기능이 한 화면에서 명확하게 구성되어 있어, 초보자도 쉽게 FCM 기능을 테스트하고 활용할 수 있습니다.

---

>![FCM_React.png](img%2FFCM_React.png) 

---


## 프런트 소스 받은 후 npm start 만 하면 된다.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


---

## 🔧 트러블슈팅 경험
### 프론트-백엔드 연동
- React-SpringBoot 통신 해결
- FCM 토큰 생명주기 관리 및 갱신 로직 구현

---

## 🚀 프로젝트 의의
React + SpringBoot + FCM을 활용하여 실무에서 활용 가능한 실시간 푸시 알림 시스템을 직접 구축하였습니다. 
단순한 API 구현을 넘어, 실제 UI와 연동하여 엔드투엔드 동작을 검증한 풀스택 개발 경험을 쌓았습니다.