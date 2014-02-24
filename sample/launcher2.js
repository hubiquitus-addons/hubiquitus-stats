var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:core:samples');
hubiquitus.logger.enable('hubiquitus:*');
var stats = require(__dirname + '/../../index');

stats.start({stats: {enabled: 'true', host: 'localhost', port: 5555}});

hubiquitus.start({discoveryAddr: 'udp://224.0.0.1:5555'})
  .set('name', 'launcher2')
  .addActor('player4', require('./player')())
  .addActor('player5', require('./player')())
  .addActor('player6', require('./player')())
  .send('player4', 'player1', 'PING', 100000)
  .send('player5', 'player3', 'PING', 120000)
  .send('player6', 'player2', 'PING', 130000);
