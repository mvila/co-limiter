# co-limiter [![Build Status](https://travis-ci.org/mvila/co-limiter.svg?branch=master)](https://travis-ci.org/mvila/co-limiter)

Limits how many generators can be ran at the same time.

## Installation

In your project folder, type:

    npm install co-limiter

## Example

Let's run 10 jobs with a maximum concurrency of 2:

    var co = require('co');
    var wait = require('co-wait');
    var limiter = require('co-limiter');

    var limit = limiter(2);

    var job = function *() {
      console.log('Doing something...');
      yield wait(1000);
    }

    for (var i = 0; i < 10; i++) {
      co(function *() {
        yield limit(job());
      })();
    }

The loop duration will be 5 seconds.

## API

### limiter(concurrency)

Return a `limit` function with the specified `concurrency`.

### limit(generator, [priority])

Yield the specified `generator`. If the maximum concurrency is reached, wait until a slot becomes available. You can optionally specify the `priority` parameter if you want to prioritize certain generators.

## License

MIT
