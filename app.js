const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./config');

const { connectionString } = config;
const app = express();

mongoose.connect(connectionString)
    .then((result) => { app.listen(3000) })
    .catch((err) => { console.log(err) })
    ;
// register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    //res.send('<p>About</p>');
    res.render('about', { title: 'About' })
});

app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((data) => {
            res.render('index', { title: "All Blogs", blogs: data })
        })
        .catch((err) => { console.log(err) })
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' })
})

// handle 404
// app.use() will fire at every request
// but only if request comes down that far
// i.e. non of the above app.get() takes place

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' })
})