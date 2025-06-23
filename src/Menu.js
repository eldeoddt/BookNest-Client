import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Menu({ mode, toggleMode }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("ACCESS_TOKEN"));

  // 토큰 변경 감지
  useEffect(() => {
    const checkToken = () => {
      const updatedToken = localStorage.getItem("ACCESS_TOKEN");
      setToken(updatedToken);
    };

    window.addEventListener("storage", checkToken);
    const interval = setInterval(checkToken, 1000); // 현재 탭에서 감지

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setToken(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book 관리 시스템
        </Typography>

        {/* 다크모드 토글 */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {mode === "dark" ? "🌙 다크모드" : "☀️ 라이트모드"}
          </Typography>
          <Switch checked={mode === "dark"} onChange={toggleMode} color="default" />
        </Box>

        <Button color="inherit" component={Link} to="/">홈</Button>

        {!token || token === "null" ? (
          <>
            <Button color="inherit" component={Link} to="/login">로그인</Button>
            <Button color="inherit" component={Link} to="/signup">계정 생성</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
