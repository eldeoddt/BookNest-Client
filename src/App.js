import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookPage from "./BookPage/BookPage";
import Login from "./Login";
import SignUp from "./Signup";
import Menu from "./Menu";
import PrivateRoute from "./PrivateRoute";
import SocialLoginRedirectHandler from "./SocialLoginRedirectHandler";

function App() {
  
  const token = localStorage.getItem("ACCESS_TOKEN");

  return (
<Router>
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <>
            <Menu /> 
            <BookPage />
          </>
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/sociallogin" element={<SocialLoginRedirectHandler />} />
  </Routes>
</Router>

  );
}

export default App;
