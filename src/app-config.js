let backendHost;

// 현재 브라우저의 domain name을 얻는다.
const hostname = window && window.location && window.location.hostname;

// hostname이 localhost이면 아래 주소이다.
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

// 주소를 변수에 담아 export
export const API_BASE_URL = `${backendHost}`;
