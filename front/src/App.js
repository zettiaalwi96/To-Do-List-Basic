import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
