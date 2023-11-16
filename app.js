const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs')

app.listen(3000);
app.use(express.static(__dirname + '/public'));

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