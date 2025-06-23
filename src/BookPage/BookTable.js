import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

function BookTable({ books }) {
  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>도서 ID</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>저자</TableCell>
            <TableCell>출판사</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>유저 ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>{book.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default BookTable;