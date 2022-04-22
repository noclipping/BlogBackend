const Post = require('../models/post')
const { body, validationResult } = require('express-validator')
exports.post_list = function (req, res, next) {
    Post.find({}, (err, results) => {
        res.send(results)
    })
}
exports.create_post = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Author must be specified.'),
    body('content')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Content must be specified.'),
    body('author').trim().isLength({ min: 1 }).escape(),

    function (req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) next(errors)
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            author: req.body.author,
            imgURL: req.body.imgURL,
        }).save((err) => {
            if (err) {
                next(err)
            } else {
                Post.find({ content: req.body.content }, (err, result) => {
                    if (err) next(err)
                    res.send(result)
                })
            }
        })
    },
]
exports.get_post = function (req, res, next) {
    Post.find({ _id: req.params.id }, (err, result) => {
        res.send(result)
    })
}
exports.delete_post = function (req, res, next) {
    Post.deleteOne({ _id: req.params.id }, (err, docs) => {
        res.send(docs)
    })
}

exports.update_post = [
    body('content')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Content must be specified.'),
    function (req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) next(errors)
        Post.updateOne(
            { _id: req.params.id },
            { content: req.body.content },
            (err, docs) => {
                if (err) next(err)
                res.send(docs)
            }
        )
    },
]
