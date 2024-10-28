const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "writer", "reader"],
    default: "reader",
  },
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  }, // Link to the user's profile image
  bio: { type: String }, // Short bio for the user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
