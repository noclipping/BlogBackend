const Post = require("../models/post");

exports.post_list = function (req, res, next) {
  Post.find({}, (err, results) => {
    res.send(results);
  });
};
exports.create_post = function (req, res, next) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  }).save((err) => {
    if (err) {
      return next(err);
    }
  });
  Post.findOne(post, (err, result) => {
    res.send(result);
  });
};
