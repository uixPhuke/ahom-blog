const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reaction: { type: String, enum: ["like", "love", "wow"], default: "like" }, // You can add more reactions
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Like", likeSchema);
