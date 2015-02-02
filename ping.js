'use strict';
/*jslint unparam: true*/
function getPing(req, res, next) {
  res.send('pong - It works!');
  next();
}
/*jslint unparam: false*/

module.exports = {
  getPing: getPing
};