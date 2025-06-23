import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

import Login from "./Login";
import SignUp from "./Signup";
import BookPage from "./BookPage/BookPage";
import SocialLoginRedirectHandler from "./SocialLoginRedirectHandler";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sociallogin" element={<SocialLoginRedirectHandler />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <BookPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default AppRouter;
