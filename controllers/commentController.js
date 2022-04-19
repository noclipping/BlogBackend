const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.comment_list = function (req, res, next) {
  Comment.find({}, (err, results) => {
    res.send(results);
  });
};
exports.get_comment = function (req, res, next) {
  Comment.find({ _id: req.params.id }, (err, result) => {
    res.send(result);
  });
};

exports.create_comment = [
  body("author")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Author must be specified."),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified."),
  body("post").trim().isLength({ min: 1 }).escape(),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        date: req.body.date,
        post: req.body.post,
      })
        .save()
        .then((savedDoc) => {
          Post.findByIdAndUpdate(
            req.body.post,
            { $push: { comments: savedDoc._id } },
            (err, docs) => {
              if (err) {
                next(err);
              }
              console.log("Updated Doc: ", docs);
              res.send(docs);
            }
          );
        });
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  },
];
