'use strict';

const app     = require('../../app');

(function () {
  let server;

  function start(callback) {
    let port = process.env.PORT || 3456;
    server = app.listen(port, () => {
      callback(server.address().port);
    });
  }

  function stop(callback) {
    server.close(callback);
  }

  function address() {
    return server.address();
  }

  module.exports = {
    start: start,
    stop: stop,
    address: address
  };
})();

