# node-http-simplify

This is just an experiment. I wanted to see how fast I could wire up a
connect like middleware system for http requests. Yeah about 10
minutes :).

The result is a super tiny application with a middleware stack and a
blazing fast router. Everything is done using plain node.js. No
dependencies required.

## Next step: Integrated basic middleware from express

Just wanted to know whether it would be possible to port existing middleware
from express to this small alternative. I got `cookie-parser` and `body-parser`
successfully working.

To run the whole thing, just spawn:

    $ node index.js

... and visit http://localhost:3000 using a browser which supports cookies.

Checkout that we're using real express middleware and the ported small cookie
handler in `lib/cookie.js`. Awesome! I really like this middleware style.

```js
// ...

// Load express middleware.
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// ...
// Local imports left out for brevity ...
// ...

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

// ...
```
