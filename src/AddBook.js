import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";

function AddBook({ addBook }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    userId: "",
  });

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onButtonClick = () => {
    addBook(book);
    setBook({
      title: "",
      author: "",
      publisher: "",
      userId: ""
    }); // 전체 초기화
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField label="Title" name="title" value={book.title} onChange={onInputChange} />
      <TextField label="Author" name="author" value={book.author} onChange={onInputChange} />
      <TextField label="Publisher" name="publisher" value={book.publisher} onChange={onInputChange} />
      <TextField label="User ID" name="userId" value={book.userId} onChange={onInputChange} />
      <Button variant="contained" onClick={onButtonClick}>제품 추가</Button>
    </Stack>
  );
}

export default AddBook;
