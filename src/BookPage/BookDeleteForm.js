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
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { searchBookByTitle, deleteBook } from "../service/ApiService";

/**
 * 제목으로 도서 검색 후 삭제 가능한 컴포넌트
 */
function BookDeleteForm({ onActionComplete }) {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // 검색 요청
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await searchBookByTitle(title);
      setResults(res.data);
      setSearched(true);
      inputRef.current.blur();
    } catch (err) {
      console.error("[도서 검색 실패]", err);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 검색어 초기화
  const handleClear = () => {
    setTitle("");
    setResults([]);
    setSearched(false);
    inputRef.current.focus();
  };

  // 삭제
  const handleDelete = async (book) => {
    if (!window.confirm(`'${book.title}'을 정말 삭제하시겠습니까?`)) return;

    try {
      await deleteBook(book);
      alert("삭제 완료!");
      setResults(results.filter((b) => b.id !== book.id));
      onActionComplete();
    } catch (err) {
      console.error("[도서 삭제 실패]", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Stack spacing={3}>
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
            disabled={loading}
            sx={{
              minWidth: 100,
              py: 1.8,
            }}
          >
            {loading ? "검색 중..." : "검색"}
          </Button>
        </Stack>

        {searched && results.length === 0 && (
          <Typography color="text.secondary">검색 결과가 없습니다 😢</Typography>
        )}

        {results.length > 0 && (
          <List sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
            {results.map((book) => (
              <React.Fragment key={book.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" color="error" onClick={() => handleDelete(book)}>
                      <DeleteIcon />
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
      </Stack>
    </form>
  );
}

export default BookDeleteForm;
