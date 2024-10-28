const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  url: { type: String, required: true }, // URL of the media file
  type: { type: String, enum: ["image", "video"], required: true }, // Image or Video type
  title: { type: String }, // Optional title for the media
  description: { type: String }, // Optional description for the media
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who uploaded the media
  uploadedAt: { type: Date, default: Date.now }, // Date when media was uploaded
});

module.exports = mongoose.model("Media", mediaSchema);
