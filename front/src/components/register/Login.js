import React, { useState } from "react";
//import { CredentialContext } from "../../App";
//import { useAuth } from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import "./login.css"
let baseURL = "http://localhost:3001";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  //const [, setCredentials] = useContext(CredentialContext);
  //const [auth] = useAuth()
  //const history=useHistory()

  const setLocalStorage = (id, username) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("username", username);
    console.log(localStorage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + "/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setErr("Wrong password or username !");
          setUsername("");
          setPassword("");
          throw Error("Salah. Try again!");
        }
        return res.json();
      })
      .then((data) => {
        //setCredentials({ username, password })
        //history.push('/Main')
        //auth.login(username)
        setLocalStorage(data._id, data.username);
        console.log(data);
        console.log("Login Successful");
        navigate("/Main");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div>
    //   <h1>Welcome back !</h1>
    //   <h4>Let's login to continue exploring</h4>

    //   <form onSubmit={handleSubmit}>
    //     {err && <p> {err} </p>}
    //     <label htmlFor="username">
    //       <BsFillPersonFill />
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       required
    //       value={username}
    //       id="username"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <br /> <br />
    //     <label htmlFor="password">
    //       <RiLockPasswordFill />
    //     </label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       required
    //       value={password}
    //       id="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <br />
    //     <button>Log In</button>
    //   </form>
    //   <h4>
    //     Don't have and account ? <Link to="/signup">Sign up here</Link>
    //   </h4>
    // </div>

    <div className="html">
      <div className="body">
        <div className="login">
          <h2>Welcome back !</h2>
          <h3>Let's login to continue adding task</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            {err && <p className='warning'> {err} </p>}
            <div className="textbox">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="material-symbols-outlined">
                <BsFillPersonFill />
              </span>
            </div>

            <div className="textbox">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="material-symbols-outlined">
                <RiLockPasswordFill />
              </span>
            </div>
            <button type="submit">LOGIN</button>
            <h4>
              Don't have and account ?{" "}
              <Link to="/signup" className="link">
                Sign up here
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
