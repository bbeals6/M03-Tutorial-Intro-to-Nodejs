const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const dbURI = 'mongodb+srv://netjinja:test1234@cluster0.3ypf18c.mongodb.net/nodetuts?retryWrites=true&w=majority'
const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000)
  }).catch(err => {
    console.log(err)
  })

app.set('view engine', 'ejs')

//static
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(rv => res.render('details', { title: 'Blog Details', blog: rv }))
    .catch(err => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(rv => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(rv => {
      res.render('index', { title: 'All Blogs', blogs: rv })
    })
    .catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' })
})
