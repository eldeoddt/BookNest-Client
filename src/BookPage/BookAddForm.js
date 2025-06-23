import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { addBook } from "../service/ApiService";

/**
 * 도서 등록 폼 컴포넌트
 * - 유저 ID는 JWT 기반으로 처리하므로 입력받지 않음
 */
function BookAddForm({ onActionComplete }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 등록 버튼 클릭 시 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!form.title || !form.author || !form.publisher || !form.price) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    addBook(form)
      .then(() => {
        alert("도서 등록 완료!");
        onActionComplete(); // 부모 컴포넌트에 알림
        setForm({ title: "", author: "", publisher: "", price: "" });
      })
      .catch((error) => {
        console.error("[도서 등록 실패]", error);
        alert("도서 등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="제목" name="title" value={form.title} onChange={handleChange} />
        <TextField label="저자" name="author" value={form.author} onChange={handleChange} />
        <TextField label="출판사" name="publisher" value={form.publisher} onChange={handleChange} />
        <TextField
          label="가격"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">등록</Button>
      </Stack>
    </form>
  );
}

export default BookAddForm;
