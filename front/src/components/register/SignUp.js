import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
//import { CredentialContext } from "../../App";
//import "./login.css";
let baseURL = "http://localhost:3001";

const SignUp = () => {
  //const [credentials, setCredentials] = useContext(CredentialContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + "/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      //.then((res) => res.json())
      .then((res) => {
        //console.log(res);
        if (!res.ok) {
          setErr("Username already exist. Try again !");
        }
        if (res.ok) {
          setSuccess("Account successfully created !");
          setErr("");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    // <div>
    //   <h1>Create Your Account</h1>
    //   <h4>Please enter info to create account</h4>

    //   <form onSubmit={handleSubmit}>
    //     {err && <p> {err} </p>}
    //     {success && <p> {success} </p>}
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
    //     <label htmlFor="email">
    //       <MdEmail />
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="Email"
    //       required
    //       value={email}
    //       id="email"
    //       onChange={(e) => setEmail(e.target.value)}
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
    //     <br /> <br />
    //     <button>Register</button>
    //   </form>
    //   <br />
    //   <Link to="/">Continue to Login </Link>
    // </div>

    <div className="html">
      <div className="body">
        <div className="login">
          <h2>Create Your Account</h2>
          <h3>Please enter info to create account</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            {err && <p className="warning"> {err} </p>}
            {success && <p className="warning"> {success} </p>}
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
                type="text"
                placeholder="Email"
                required
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="material-symbols-outlined">
                <MdEmail />
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
            <button type="submit">REGISTER</button>
            <h4>
              Done register?{" "}
              <Link to="/" className="link">
                Continue to Login
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
