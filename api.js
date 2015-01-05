'use strict';
var restify = require('restify');

function respond(req, res, next) {
    res.send('pong');
    next();
}

var server = restify.createServer();
server.get('/ping/', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});