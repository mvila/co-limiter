var co = require('co');
var wait = require('co-wait');
var limiter = require('./');

var limit = limiter(2);

var job = function *() {
  console.log('Doing something...');
  yield wait(1000);
}

// Loop duration will be 5 seconds
for (var i = 0; i < 10; i++) {
  co(function *() {
    yield limit(job());
  }).catch(function(err) {
    console.error(err.stack);
  });
}
