const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//To not allow duplicate of username
signupSchema.index({ username: 1 }, { unique: true })

const SignUp = mongoose.model("SignUp", signupSchema);

module.exports = SignUp
