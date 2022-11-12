const express = require("express");
const signup = express.Router();
const bcrypt = require("bcrypt");
const SignUp = require("../models/signupSchema");

signup.get("/", (req, res) => {
  console.log("backend signup");
  //   SignUp.find({}, (err, signup) => {
  //     if (err) {
  //       res.status(400).json({ err: err.message });
  //     } else {
  //       res.status(200).json(signup);
  //     }
  //   });
});

// signup.get("/login", (req, res) => {});

signup.post("/", (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  SignUp.create(req.body, (err, createdSignUp) => {
    if (err) {
      console.log(err);
      if (err.code == 11000)
        res.status(400).json({ err: "User already exist" });
    } else res.json(createdSignUp);

    //console.log(err)
    //if (err) res.status(400).json({ err: err.message });

    //   else {
    //       console.log("Created sign up")
    //     // res.send(createdSignUp);
    //       res.json(createdSignUp)
    //   }
    //   });
  });
});

module.exports = signup;
