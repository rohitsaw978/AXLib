const {Schema} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["admin", "librarian", "user"],
    default: "user",
  },

  stream: {
    type: String,
    default: "",
  },

  year: {
    type: Number,
    default: null,
  },

  isGoogleUser: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = { UserSchema };