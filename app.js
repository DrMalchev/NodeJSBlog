const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>Home</p>');
    res.sendFile('./views/index.html', { root: __dirname })
});

app.get('/about', (req, res) => {
    //res.send('<p>About</p>');
    res.sendFile('./views/about.html', { root: __dirname })
});

app.get('/about-us', (req, res) => {
    //res.send('<p>About</p>');
    res.redirect('/about')
});

// handle 404
// app.use() will fire at every request
// but only if request comes down that far
// i.e. non of the above app.get() takes place

app.use((req, res) => {
    res
        .status('404')
        .sendFile('./views/404.html', { root: __dirname })
})