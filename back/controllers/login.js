const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");

const SignUp = require("../models/signupSchema");

login.post("/", async (req, res) => {
  try {
    const userExist = await SignUp.findOne({ username: req.body.username });
    const { _id, username, email, password } = userExist;

    const checkUser = await bcrypt.compare(req.body.password, password);
    if (!checkUser) throw Error;
    console.log(checkUser);
    res.status(200).json({ checkUser, _id, username, email });
  } catch {
    res.status(400).json({ err: "wrong username or password" });
  }
});

module.exports = login;
