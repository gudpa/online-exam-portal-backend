const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    fullname: {
      type: String,
    },
    class: {
      type: String,
    },
    roll_no: {
      type: String,
    },
    college: {
      type: String,
    },
    branch: {
      type: String,
    },
    reset: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
    solutions: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
