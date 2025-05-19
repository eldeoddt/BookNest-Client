import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

function BookList({ books }) {
  return (
    <Paper style={{ margin: 16 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.publisher}</TableCell>
              <TableCell>{b.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default BookList;
