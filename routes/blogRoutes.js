const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' })
})

router.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(rv => res.render('details', { title: 'Blog Details', blog: rv }))
    .catch(err => console.log(err))
})

router.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(rv => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
})

router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(rv => {
      res.render('index', { title: 'All Blogs', blogs: rv })
    })
    .catch(err => console.log(err))
})

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
