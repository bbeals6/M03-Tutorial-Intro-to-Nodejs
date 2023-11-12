const Blog = require('../models/blog')

module.exports.blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
}

module.exports.blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then(rv => {
    res.render('index', { title: 'All Blogs', blogs: rv })
  })
  .catch(err => console.log(err))
}

module.exports.blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then(rv => res.render('details', { title: 'Blog Details', blog: rv }))
    .catch(err => console.log(err))
}

module.exports.blog_create_get = (req, res) => {
  res.render('create', { title: 'Create' })
}

module.exports.blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(rv => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
}
