import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { searchBookByTitle } from "../service/ApiService";

/**
 * 도서 제목 검색 폼 및 결과 리스트 컴포넌트
 */
function BookSearchForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

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
      alert("도서 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setResults([]);
    setSearched(false);
    inputRef.current.focus();
  };

  return (
    <Stack spacing={3}>
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
            disabled={loading}
            sx={{ minWidth: 100, py: 1.8 }}
          >
            {loading ? "검색 중..." : "검색"}
          </Button>
        </Stack>
      </form>

      {/* 검색 결과 표시 */}
      {searched && results.length === 0 && (
        <Typography color="text.secondary">검색 결과가 없습니다 😢</Typography>
      )}

      {results.length > 0 && (
        <List sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
          {results.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem>
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
  );
}

export default BookSearchForm;
