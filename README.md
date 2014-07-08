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
