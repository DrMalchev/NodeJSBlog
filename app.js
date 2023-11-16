const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs')

app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>Home</p>');
    res.render('index')
});

app.get('/about', (req, res) => {
    //res.send('<p>About</p>');
    res.render('about')
});

app.get('/blogs/create', (req, res) => {
    res.render('create')
})

// handle 404
// app.use() will fire at every request
// but only if request comes down that far
// i.e. non of the above app.get() takes place

app.use((req, res) => {
    res
        .status(404)
        .render('404')
})