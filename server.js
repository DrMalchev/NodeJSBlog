const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('req made')

    res.setHeader('Content-Type', 'text/html')
    let path = './views';

    switch (req.url) {
        case '/':
            console.log(path + '/index.html')
            writeToResponse(res, path + '/index.html', '200')
            break;
        case '/about':
            writeToResponse(res, path + '/about.html', '200')
            break;
        case '/about-me':
            res.statusCode = '301';
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            writeToResponse(res, path + '/404.html', '404')
            break;
    }






});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000')
})

function writeToResponse(res, url, statusCode) {
    fs.readFile(url, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        }
        else {
            //res.write(data);
            res.statusCode = statusCode;
            res.end(data);
        }
    })
}