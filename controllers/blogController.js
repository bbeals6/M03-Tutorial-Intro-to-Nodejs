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
    res.render('blogs/index', { title: 'All Blogs', blogs: rv })
  })
  .catch(err => console.log(err))
}

module.exports.blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then(rv => res.render('blogs/details', { title: 'Blog Details', blog: rv }))
    .catch(err => {
      res.status(404).render('404', { title: 'Blog Not Found' })
    })
}

module.exports.blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create' })
}

module.exports.blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(rv => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
}
