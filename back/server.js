// REQUIRE EXPRESS
const express = require("express");
const app = express();

// CONNECTION
const PORT = 3001;
const cors = require("cors");
const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOption = {
  origin: whitelist,
};

// HIDE MONGO DB ATLAS LINK
const dotenv = require("dotenv");
dotenv.config();

// AUTHENTICATION
const session = require("express-session");

// DATABASE
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_ZETTI_KEY, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening to port no: " + PORT);
    });
  })
  .catch(console.error);

app.use(express.json());
app.use(cors(corsOption));

// CONTROLLERS
const signupController = require("./controllers/signup")
const loginController = require("./controllers/login")
const taskController = require("./controllers/task")

app.use ("/login", loginController)
app.use("/signup", signupController) 
app.use("/Main", taskController)
