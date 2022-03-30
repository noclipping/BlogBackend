const Comment = require("../models/comment");
const Post = require("../models/post");

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
exports.create_comment = function (req, res, next) {
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
};
