import React, { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import BookAddForm from "./BookAddForm";
import BookUpdateForm from "./BookUpdateForm";
import BookSearchForm from "./BookSearchForm";
import BookDeleteForm from "./BookDeleteForm";
import BookTable from "./BookTable";
import { getBooks } from "../service/ApiService";

function BookPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [books, setBooks] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue !== 2) {
      fetchBooks();
    }
  };

  const fetchBooks = () => {
    getBooks().then((res) => setBooks(res.data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <BookAddForm onActionComplete={fetchBooks} />;
      case 1:
        return <BookUpdateForm onActionComplete={fetchBooks} />;
      case 2:
        return <BookSearchForm />; 
      case 3:
        return <BookDeleteForm onActionComplete={fetchBooks} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        도서 관리 시스템
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="도서 등록" />
        <Tab label="도서 수정" />
        <Tab label="도서 검색" />
        <Tab label="도서 삭제" />
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ minHeight: 180 }}>{renderTabContent()}</Box>


      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        📚 현재 등록된 도서 목록
      </Typography>
      <BookTable books={books} />
      <Box sx={{ mb: 6 }} />
    </Container>
  );
}

export default BookPage;
