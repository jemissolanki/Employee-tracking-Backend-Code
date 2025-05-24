const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please Enter a Valid Email"],
  },
  age: {
    type: Number,
    min: [0, "Age cannot be negative"],
    max: [120, "Age cannot exceed 120"],
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  postDesignation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  refreshToken: { type: String },
  accessToken: { type: String },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.matchPassword = async function name(enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  
  
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
