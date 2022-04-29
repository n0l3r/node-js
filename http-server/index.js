const http = require('http');
const server = http.createServer();

const PORT = 3000;

server.on('request', (req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Learn HTTP APIs and Routing </h1>');
    } else if (req.url === '/api') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: 'Hello World'
        }));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(PORT, () => {
    console.log('Server started on port 3000');
});