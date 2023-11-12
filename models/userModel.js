const mongoose = require("mongoose");
const { userRoles } = require("../constants/constants");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
  },

  role: {
    type: String,
    enum: [userRoles.READER, userRoles.LIBRARIAN, userRoles.ADMIN],
    default: userRoles.READER,
  },
});

module.exports = mongoose.model("User", userSchema);
