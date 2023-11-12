const express = require('express')
const Blog = require('../models/blog')
const BlogController = require('../controllers/blogController')

const router = express.Router()

router.get('/create', BlogController.blog_create_get)
router.post('/create', BlogController.blog_create_post)
router.get('/:id', BlogController.blog_details)
router.delete('/:id', BlogController.blog_delete)
router.get('/', BlogController.blog_index)

module.exports = router
