var qs = require('querystring');
var url = require('url');

module.exports = function() {
  return function(req, res, next) {
    req.query = qs.parse(url.parse(req.url).query);
    next();
  };
};
