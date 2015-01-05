'use strict';
exports.getMood = function (req, res, next) {
  //Do some magic here
  res.send("I'm really moody");
  next();
};