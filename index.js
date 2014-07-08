var http = require('http');
var url = require('url');
var qs = require('querystring');
var events = require('events');
var util = require('util');

// Load express middleware.
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var application = require('./lib/application');
var queryParser = require('./lib/query-parser');
var cookie = require('./lib/cookie');
var router = require('./lib/router');

var app = application();

app
  .use(function(req, res, next) {

    // Behave like express would.
    req.originalUrl = req.url;
    next();
  })
  .use(queryParser())
  .use(bodyParser.json())
  .use(cookie())
  .use(cookieParser('keyboard cat'))
  .use(session({ secret: 'keyboard cat' }))
  .use(
    router()
      .route(/^\/$/, function(req, res) {
        console.log(req.session);
        if (req.session.testKey) {
          res.end('I know you ' + req.session.testKey);
        } else {
          req.session.testKey = 42;
          res.end('Hello world!');
        }
      })
      .route(/^\/error$/, function(req, res, next) {
        next(new Error('Nooo!!'));
      })
  );

app.use(function(req, res) {
  res.statusCode = 404;
  res.end('No route matched!');
});

var server = http.createServer(app);

server.listen(3000);
