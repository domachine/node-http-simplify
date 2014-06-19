module.exports = function() {
  var routes = [];

  function request(req, res, next) {
    var url = req.urlParsed.pathname;
    var max = 0;
    var match;

    // Find the highest match.
    routes.forEach(function(route) {
      var m = url.match(route[0]);

      if (!m) return;
      if (m[0].length > max) {
        max = m[0].length;
        match = route;
      }
    });

    if (!match) return next();
    match[1](req, res, next);
  };

  request.route = function(regex, fn) {
    routes.push([ regex, fn ]);
    return this;
  };

  return request;
};
