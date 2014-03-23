"use strict";

var co = require('co');
var Queue = require('co-priority-queue');

var limiter = function(concurrency) {
  var queue = new Queue();

  // Create consumers
  for (var i = 0; i < concurrency; i++) {
    co(function *() {
      var yieldable;
      while (true) {
        yieldable = yield queue.next();
        yield yieldable();
      }
    })();
  }

  var limit = function(generator, priority) {
    return function(cb) {
      queue.push(function *() {
        try {
          cb(null, yield generator);
        } catch (err) {
          cb(err);
        }
      }, priority);
    };
  };

  return limit;
};

module.exports = limiter;
