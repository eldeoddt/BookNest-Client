import React from "react";
import { Container, Button, TextField, Stack, Typography } from "@mui/material";
import { signin, socialLogin } from "./service/ApiService";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    signin({
      username: data.get("username"),
      password: data.get("password")
    });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5">로그인</Typography>
          <TextField label="아이디" name="username" fullWidth />
          <TextField label="비밀번호" name="password" type="password" fullWidth />
          <Button type="submit" variant="contained">로그인</Button>
          <Button variant="outlined" onClick={() => socialLogin("github")}>
            깃허브로 로그인하기
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
