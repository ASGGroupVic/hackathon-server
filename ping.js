'use strict';
/*jslint unparam: true*/
function getPing(req, res, next) {
  res.send('pong');
  next();
}
/*jslint unparam: false*/

module.exports = {
  getPing: getPing
};