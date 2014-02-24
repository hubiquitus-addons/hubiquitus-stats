var dgram = require('dgram');
var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:core:stats');
var properties = hubiquitus.properties;

var host;
var port;
const socket = dgram.createSocket('udp4');
var loop;

var counts = {
  'global': 0
};

exports.start = function (options) {
  options = options || {};
  host = options.host || 'localhost';
  port = options.port || 5555;
  loop && clearInterval(loop);
  hubiquitus.monitoring.on('req sent', listener);
  loop = setInterval(sendStats, 1000);
};

exports.stop = function () {
  hubiquitus.monitoring.removeListener('req sent', listener);
  loop && clearInterval(loop);
};

function listener(req) {
  counts['global']++;
  var key = req.from + '->' + req.to;
  counts[key] === undefined ? counts[key] = 1 : counts[key]++;
}

function sendStats() {
  var buffer = new Buffer(JSON.stringify({id: properties.ID, counts: counts}));
  counts = {'global': 0};
  socket.send(buffer, 0, buffer.length, port, host, function (err) {
    err && logger.error('error sending stats', err);
  });
}
