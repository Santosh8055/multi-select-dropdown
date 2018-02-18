var http = require('http');
var fs = require('fs');

// 404 response

function sendBlankResponse(response) {
    response.writeHead(404, { 'Context-Type': 'text/plain' });
    response.write('Error! Page not found');
    response.end();
}

function onRequest(req, res) {
    if (req.method == 'GET' && req.url === '/states') {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Context-Type': 'text/json' });
        fs.createReadStream('./server/states.json').pipe(res);
    } else {
        sendBlankResponse(res);
    }
}

http.createServer(onRequest).listen(8888);

console.log('server is running');