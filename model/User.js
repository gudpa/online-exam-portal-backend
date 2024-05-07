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
    fathersname: {
      type: String,
    },
    mothersname: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    religion: {
      type: String,
    },
    motherTounge: {
      type: String,
    },
    familyIncome: {
      type: String,
    },
    nationality: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    state: {
      type: String,
    },
    taluka: {
      type: String,
    },
    pincode: {
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
