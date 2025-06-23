import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { searchBookByTitle, updateBook } from "../service/ApiService";

function BookUpdateForm({ onActionComplete }) {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
    publisher: "",
    price: "",
  });

  // 🔍 검색 실행
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      const res = await searchBookByTitle(title);
      setResults(res.data);
      setSearched(true);
      inputRef.current.blur();
    } catch (err) {
      console.error("[도서 검색 실패]", err);
      alert("도서 검색 중 오류가 발생했습니다.");
    }
  };

  // 🔄 입력 초기화
  const handleClear = () => {
    setTitle("");
    setResults([]);
    setSearched(false);
    inputRef.current.focus();
  };

  const handleSelectBook = (book) => {
    setForm({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      price: book.price,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, title, author, publisher, price } = form;
    if (!id || !title || !author || !publisher || !price) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await updateBook(form);
      alert("도서 수정 완료!");
      setForm({ id: "", title: "", author: "", publisher: "", price: "" });
      setResults([]);
      setSearched(false);
      onActionComplete();
    } catch (err) {
      console.error("[도서 수정 실패]", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Stack spacing={3}>
      {/* 🔍 검색 폼 */}
      <form onSubmit={handleSearch}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="도서 제목"
            placeholder="도서 제목을 입력하세요"
            value={title}
            inputRef={inputRef}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              endAdornment: title && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ minWidth: 100, py: 1.8 }}
          >
            검색
          </Button>
        </Stack>
      </form>

      {/* 🔍 검색 결과 리스트 */}
      {searched && results.length === 0 && (
        <Typography color="text.secondary">검색 결과가 없습니다 😢</Typography>
      )}
      {results.length > 0 && (
        <List sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
          {results.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleSelectBook(book)}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${book.title} (${book.author})`}
                  secondary={`출판사: ${book.publisher} | 가격: ${book.price}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      {/* ✍️ 수정 폼 */}
      {form.id && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="제목"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <TextField
              label="저자"
              name="author"
              value={form.author}
              onChange={handleChange}
            />
            <TextField
              label="출판사"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
            />
            <TextField
              label="가격"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              수정 완료
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
}

export default BookUpdateForm;
