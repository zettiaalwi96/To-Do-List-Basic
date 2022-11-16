import React, {useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./components/darkMode/darkMode";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import MainPage from "./components/main/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const ProtectedRoute = ({ userId, children }) => {
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { darkMode } = useContext(AppContext);
  const userId = localStorage.getItem("userId");

  return (
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/Main"
              element={
                <ProtectedRoute userId={userId}>
                  <MainPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
