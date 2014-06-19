var http = require('http');
var url = require('url');
var qs = require('querystring');
var events = require('events');
var util = require('util');

var application = require('./lib/application');
var router = require('./lib/router');

var app = application();

app.use(function(req, res, next) {
  var u = url.parse(req.url);
  req.urlParsed = u;

  // Parse query.
  req.query = qs.parse(u.query);
  next();
});

app.use(
  router()
    .route(/^\/$/, function(req, res) {
      res.end('Hello world!');
    })
    .route(/^\/error$/, function(req, res, next) {
      //res.write('Hello world!');
      //res.end();
      next(new Error('Nooo!!'));
    })
);

app.use(function(req, res) {
  res.statusCode = 404;
  res.end('No route matched!');
});

var server = http.createServer(app);

server.listen(3000);
