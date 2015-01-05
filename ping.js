'use strict';
exports.getPing = function (req, res, next) {
  res.send('pong');
  next();
};