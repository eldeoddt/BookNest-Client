import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";

function AddBook({ addBook }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: ""
  });

  // 입력 변경 핸들러
  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // 등록 버튼 클릭 시 처리
  const onButtonClick = () => {
    if (!book.title || !book.author || !book.publisher) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    addBook(book); // 상위에서 API 호출
    setBook({
      title: "",
      author: "",
      publisher: ""
    }); // 입력값 초기화
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Title"
        name="title"
        value={book.title}
        onChange={onInputChange}
      />
      <TextField
        label="Author"
        name="author"
        value={book.author}
        onChange={onInputChange}
      />
      <TextField
        label="Publisher"
        name="publisher"
        value={book.publisher}
        onChange={onInputChange}
      />
      <Button variant="contained" onClick={onButtonClick}>
        도서 추가
      </Button>
    </Stack>
  );
}

export default AddBook;
