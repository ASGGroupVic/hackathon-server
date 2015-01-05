'use strict';

function getMoodForClient(code, callback){
  var mood = {};
  
  // NOT THE CORRECT QUERY YET. NEEDS TO CHECK RELATIONS
  // FOR MOOD. - JP
  var query = [
    'MATCH (n: `Client` {clientCode:{cCode}})  ',
    'RETURN n '
  ].join('\n');
  
  var params = {
    cCode : code
  };

  db.query(query, params, function (err, results) {
    if (err) throw err;
    var mood = results.map(function (result) {
      console.log(result['n']['data']);
      return result['n']['data'];
    });
  	callback(mood);
  });
}

exports.getMood = function (req, res, next) {

  var code = req.params.code;
  console.log('Client: ' + code);
  
  getMoodForClient(code, function(mood){
     console.log('Hooray! ' + mood);

     res.send(mood);
     next();
  });
};

