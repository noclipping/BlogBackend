const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  published: { type: Boolean, default: true },
  imgURL: {
    type: String,
    default: "https://i.imgur.com/0dqdq3m.jpeg",
  },
});

module.exports = mongoose.model("Post", PostSchema);
