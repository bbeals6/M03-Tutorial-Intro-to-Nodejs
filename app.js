const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

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

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' })
})
