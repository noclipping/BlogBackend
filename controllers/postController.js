const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
exports.post_list = function (req, res, next) {
  Post.find({}, (err, results) => {
    res.send(results);
  });
};
exports.create_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Author must be specified."),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified."),
  body("author").trim().isLength({ min: 1 }).escape(),

  async function (req, res, next) {
    const post = await new Post({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      author: req.body.author,
    }).save((err) => {
      if (err) {
        return next(err);
      }
    });
    Post.find({ content: req.body.content }, (err, result) => {
      res.send(result);
    });
  },
];
exports.get_post = function (req, res, next) {
  Post.find({ _id: req.params.id }, (err, result) => {
    res.send(result);
  });
};
exports.delete_post = function (req, res, next) {
  Post.deleteOne({ _id: req.params.id }, (err, docs) => {
    res.send(docs);
  });
};

exports.update_post = function (req, res, next) {
  Post.updateOne(
    { _id: req.params.id },
    { content: req.body.content },
    (err, docs) => {
      res.send(docs);
    }
  );
};
