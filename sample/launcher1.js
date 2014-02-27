var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:core:samples');
hubiquitus.logger.enable('hubiquitus:*');
var stats = require(__dirname + '/../index');

stats.start({host: 'localhost', port: 7777});

hubiquitus.start({discoveryAddr: 'udp://224.0.0.1:5555'})
  .set('name', 'launcher1')
  .addActor('player1', require('./player')())
  .addActor('player2', require('./player')())
  .addActor('player3', require('./player')());
