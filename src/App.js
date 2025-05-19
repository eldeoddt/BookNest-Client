import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  searchBookByTitle,
} from "./service/ApiService";
import BookRow from "./BookRow";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addForm, setAddForm] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
    userId: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
    userId: "",
  });

  const [searchTitle, setSearchTitle] = useState("");

  const fetchBooks = () => {
    getBooks().then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addBook(addForm, addForm.userId).then(() => {
      fetchBooks();
      setAddForm({
        title: "",
        author: "",
        publisher: "",
        price: "",
        userId: "",
      });
    });
  };

  const handleUpdate = () => {
    updateBook(editForm, editForm.userId).then(() => {
      fetchBooks();
      setEditForm({
        title: "",
        author: "",
        publisher: "",
        price: "",
        userId: "",
      });
    });
  };

  const handleDelete = () => {
    deleteBook(editForm, editForm.userId).then(() => {
      fetchBooks();
      setEditForm({
        title: "",
        author: "",
        publisher: "",
        price: "",
        userId: "",
      });
    });
  };

  const handleSearch = () => {
    searchBookByTitle(searchTitle).then((res) => {
      if (res.data && res.data.length > 0) {
        setEditForm(res.data[0]); // 수정/삭제 폼에만 반영
      }
    });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        📚 Book 관리 시스템
      </Typography>

      {/* 상단 리스트 테이블 */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h6">📋 Book Item Table</Typography>
        <Paper>
          <div style={{ overflowX: "auto" }}>
            <caption></caption>
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>author</th>
                  <th>publisher</th>
                  <th>price</th>
                  <th>userId</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <BookRow key={book.id} book={book} />
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </Stack>

      {/* 제품 추가 */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h6">도서 추가</Typography>
        <Stack spacing={1}>
          <TextField
            label="title"
            name="title"
            value={addForm.title}
            onChange={handleAddChange}
          />
          <TextField
            label="author"
            name="author"
            value={addForm.author}
            onChange={handleAddChange}
          />
          <TextField
            label="publisher"
            name="publisher"
            value={addForm.publisher}
            onChange={handleAddChange}
          />
          <TextField
            label="price"
            name="price"
            value={addForm.price}
            onChange={handleAddChange}
          />
          <TextField
            label="userId"
            name="userId"
            value={addForm.userId}
            onChange={handleAddChange}
          />
          <Button variant="contained" onClick={handleAdd}>
            제품 추가
          </Button>
        </Stack>
      </Stack>

      {/* 제품 검색/수정/삭제 */}
      <Stack spacing={2}>
        <Typography variant="h6">도서 검색 / 수정 / 삭제</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="검색할 title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSearch}>
            제품 검색
          </Button>
        </Stack>
        <Stack spacing={1}>
          <TextField
            label="title"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
          />
          <TextField
            label="author"
            name="author"
            value={editForm.author}
            onChange={handleEditChange}
          />
          <TextField
            label="publisher"
            name="publisher"
            value={editForm.publisher}
            onChange={handleEditChange}
          />
          <TextField
            label="price"
            name="price"
            value={editForm.price}
            onChange={handleEditChange}
          />
          <TextField
            label="userId"
            name="userId"
            value={editForm.userId}
            onChange={handleEditChange}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              제품 수정
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              제품 삭제
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
