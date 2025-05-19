import { API_BASE_URL } from "../app-config";

function request(api, method, body = null) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const options = {
    method: method,
    headers: headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${API_BASE_URL}${api}`, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`API 오류: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("API 요청 실패:", error);
    });
}

export function getBooks() {
  return request("/book/all", "GET");
}

export function searchBookByTitle(title) {
  return request(`/book?title=${encodeURIComponent(title)}`, "GET");
}

export function addBook(book, userId) {
  return request(`/book?userId=${userId}`, "POST", book);
}

export function updateBook(book, userId) {
  return request(`/book?userId=${userId}`, "PUT", book);
}

export function deleteBook(book, userId) {
  return request(`/book?userId=${userId}`, "DELETE", book);
}
