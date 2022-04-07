const Post = require("../models/post");

exports.post_list = function (req, res, next) {
  Post.find({}, (err, results) => {
    res.send(results);
  });
};
exports.create_post = async function (req, res, next) {
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
};

exports.get_post = function (req, res, next) {
  Post.find({ _id: req.params.id }, (err, result) => {
    res.send(result);
  });
};
exports.publish_post = function (req, res, next) {
  Post.updateOne(
    { _id: req.body.id },
    { published: req.body.published },
    (err, docs) => {
      console.log("Updated Docs: ", docs);
      res.send(docs);
    }
  );
};
