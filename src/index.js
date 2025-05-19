import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";

const container = document.getElementById("root");

// create root를 사용하여 컨테이너를 담은 root를 만든다.
const root = createRoot(container);

// App router를 반환한다.
root.render(<AppRouter tab="home" />);

reportWebVitals();
