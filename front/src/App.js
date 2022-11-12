import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import MainPage from "./components/main/MainPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export const CredentialContext = React.createContext();

const App = () => {
  const credentialState = useState(null);

  return (
    <div className="App">
      <CredentialContext.Provider value={credentialState}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            {/* <ProtectedRoute> */}
              <Route path="/Main" element={<MainPage />}></Route>
            {/* </ProtectedRoute> */}
          </Routes>
        </BrowserRouter>
      </CredentialContext.Provider>
    </div>
  );
};

export default App;
