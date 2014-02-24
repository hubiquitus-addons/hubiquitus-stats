var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:core:samples');
hubiquitus.logger.enable('hubiquitus:*');
var stats = require(__dirname + '/../../index');

stats.start({stats: {enabled: 'true', host: 'localhost', port: 5555}});

hubiquitus.start({discoveryAddr: 'udp://224.0.0.1:5555'})
  .set('name', 'launcher1')
  .addActor('player1', require('./player')())
  .addActor('player2', require('./player')())
  .addActor('player3', require('./player')());
