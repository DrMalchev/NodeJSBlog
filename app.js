const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const app = express();
const connectionString = 'mongodb+srv://testuser:SommerFest2@cluster0.jfd5ftu.mongodb.net/NodeTutorialDB?retryWrites=true&w=majority';
mongoose.connect(connectionString)
    .then((result) => { app.listen(3000) })
    .catch((err) => { console.log(err) })
    ;
// register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(morgan('dev'))

// test blog creation and bd write
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "BlogTitle2",
        snippet: "About Blog 2",
        body: "Blog 2 body text text text text text etxt"
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => { console.log(err) });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => { console.log(err) })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('655c78cdf681886157a942b5')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => { console.log(err) });
})


app.get('/', (req, res) => {
    //res.send('<p>Home</p>');
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];

    res.render('index', { title: 'Home', blogs: blogs })
});

app.get('/about', (req, res) => {
    //res.send('<p>About</p>');
    res.render('about', { title: 'About' })
});

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