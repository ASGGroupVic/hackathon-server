'use strict';
/*jslint unparam: true*/
exports.getPing = function (req, res, next) {
  res.send('pong');
  next();
};
/*jslint unparam: false*/