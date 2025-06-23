import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { signup } from "./service/ApiService";
import { Link } from "react-router-dom";

function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");

    signup({ username, password }).then((response) => {
      // 계정 생성 성공 시 로그인 페이지로 이동
      window.location.href = "/login";
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="username"
              label="아이디"
              variant="outlined"
              required
              fullWidth
              autoComplete="username"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password"
              label="비밀번호"
              type="password"
              variant="outlined"
              required
              fullWidth
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              계정 생성
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Link to="/login" variant="body2">
              이미 계정이 있나요? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
