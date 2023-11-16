const http = require('http');

const server = http.createServer((req, res) => {
    console.log('req made')

    res.setHeader('Content-Type', 'text/plain');
    res.write('This is my response');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000')
})