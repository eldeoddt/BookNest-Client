import { API_BASE_URL } from "../app-config";

function request(api, method, body = null) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  // ACCESS_TOKEN이 존재하면 Authorization 헤더 추가
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== "null" && accessToken !== null) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // 요청 및 응답 처리
  return fetch(`${API_BASE_URL}${api}`, options)
    .then(async (response) => {
      console.log(`[API] ${method} ${api} → status ${response.status}`);

      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        console.warn("[API] 인증 실패 (403), 로그인 페이지로 이동합니다.");
        window.location.href = "/login";
      } else {
        console.error(`[API] 오류 상태 코드: ${response.status}`);
        throw new Error(`API 오류: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("[API 요청 실패]", error);
    });
}

// 도서 관련 API

export function getBooks() {
  return request("/list", "GET");
}

export function searchBookByTitle(title) {
  return request(`/book?title=${encodeURIComponent(title)}`, "GET");
}

export function addBook(book) {
  return request(`/book`, "POST", book);
}

export function updateBook(book) {
  return request(`/book`, "PUT", book);
}

export function deleteBook(book) {
  return request(`/book`, "DELETE", book);
}

// 인증 관련 API

export function signin(userDTO) {
  return request("/auth/signin", "POST", userDTO).then((response) => {
    if (response?.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      window.location.replace("/"); // replace → 뒤로가기 이슈 방지
    } else {
      alert("로그인 실패. 아이디/비밀번호를 확인하세요.");
    }
  });
}

export function signout() {
  localStorage.removeItem("ACCESS_TOKEN");
  window.location.href = "/login"; 
}

export function signup(userDTO) {
  return request("/auth/signup", "POST", userDTO);
}

export function socialLogin(provider) {
  const frontendUrl = window.location.origin;
  window.location.href = `${API_BASE_URL}/auth/authorize/${provider}?redirect_url=${frontendUrl}`;
}
