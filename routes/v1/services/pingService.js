'use strict';
/*jslint unparam: true*/
function getPing(request, response) {
  response.json('pong!');
}
/*jslint unparam: false*/

module.exports = {
  getPing: getPing
};