var log = require('util').log;

module.exports = function application() {
  var stack = [];

  function request(req, res, next) {
    (function _run(stack) {
      if (stack.length === 0) return;
      stack[0](req, res, function(err) {
        if (err) {
          return request.error(err, req, res);
        }

        // Clear call stack.
        process.nextTick(function() {
          _run(stack.slice(1));
        });
      });
    })(stack);
  };

  request.use = function(fn) {
    stack.push(function(req, res, next) {
      try {
        fn.apply(this, arguments);
      } catch(e) {
        next(e);
      }
    });
    return this;
  };

  request.error = function(err, req, res) {
    res.statusCode = 500;
    log(err.stack);
    res.end('Internal server error');
  };

  return request;
}
