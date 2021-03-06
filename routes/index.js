let express = require('express')
let router = express.Router()
const Post = require('../models/post')
const post_controller = require('../controllers/postController')
const comment = require('../models/comment')
const comment_controller = require('../controllers/commentController')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Welcome to the api!')
})

// posts
router.get('/posts', post_controller.post_list)
router.post('/post/create', post_controller.create_post)
router.post('/post/update/:id', post_controller.update_post)
router.post('/post/delete/:id', post_controller.delete_post)
router.get('/post/:id', post_controller.get_post)
//comments
router.get('/comments', comment_controller.comment_list)
router.post('/comment/create', comment_controller.create_comment)
router.get('/comment/:id', comment_controller.get_comment)

module.exports = router
