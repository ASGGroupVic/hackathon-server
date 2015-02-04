/*jslint node: true */
'use strict';

/*jslint unparam: true*/
function getClients(request, response) {
  var clients = ['test.client', 'different.client'];
  response.json(clients);
}
/*jslint unparam: false*/

module.exports = {
  getClients: getClients
};