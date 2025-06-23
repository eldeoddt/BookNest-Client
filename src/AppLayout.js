import React, { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Menu from "./Menu";

function AppLayout({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                background: { default: "#f5f5f5", paper: "#fff" },
              }
            : {
                primary: { main: "#90caf9" },
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu mode={mode} toggleMode={() => setMode(prev => (prev === "light" ? "dark" : "light"))} />
      <main>{children}</main>
    </ThemeProvider>
  );
}

export default AppLayout;
