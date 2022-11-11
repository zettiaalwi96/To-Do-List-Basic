import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
let baseURL = "http://localhost:3001";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + "/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setErr("Wrong password or username");
          setUsername("");
          setPassword("");
          throw Error("Salah");
        }
        return res.json();
      })
      .then(() => {
        console.log("Login Successful");
        navigate("/Main");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Welcome back !</h1>
      <h4>Let's login to continue exploring</h4>

      <form onSubmit={handleSubmit}>
        {err && <p> {err} </p>}
        <label htmlFor="username">
          <BsFillPersonFill />
        </label>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <label htmlFor="password">
          <RiLockPasswordFill />
        </label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Log In</button>
      </form>
      <h4>
        Don't have and account ? <Link to="/signup">Sign up here</Link>
      </h4>
    </div>
  );
};

export default Login;
