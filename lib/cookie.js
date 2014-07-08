var sign = require('cookie-signature').sign;
var cookie = require('cookie');
var mixin = require('assimilate');
var cookieParser = require('cookie-parser');

module.exports = function() {
  return function(req, res, next) {
    res.cookie = function(name, val, options){
      options = mixin({}, options);
      var secret = req.secret;
      var signed = options.signed;
      if (signed && !secret) throw new Error('cookieParser("secret") required for signed cookies');
      if ('number' == typeof val) val = val.toString();
      if ('object' == typeof val) val = 'j:' + JSON.stringify(val);
      if (signed) val = 's:' + sign(val, secret);
      if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000;
      }
      if (null == options.path) options.path = '/';
      var headerVal = cookie.serialize(name, String(val), options);

      // supports multiple 'res.cookie' calls by getting previous value
      var prev = this.getHeader('Set-Cookie');
      if (prev) {
        if (Array.isArray(prev)) {
          headerVal = prev.concat(headerVal);
        } else {
          headerVal = [prev, headerVal];
        }
      }
      this.setHeader('Set-Cookie', headerVal);
      return this;
    };
    next();
  };
};
