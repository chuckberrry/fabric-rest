/**
 * Created by maksim on 7/18/17.
 */
"use strict";
const log4js = require('log4js');
const logger = log4js.getLogger('Socket');
const peerListener = require('../lib-fabric/peer-listener.js');
const tools = require('../lib/tools');

const hfc = require('../lib-fabric/hfc');
const networkConfig = hfc.getConfigSetting('network-config');

// config
const config = require('../config.json');
const USERNAME = config.user.username;

module.exports = {
  init: init
};

/**
 * @param {Server} io
 * @param {object} options
 */
function init(io, options){
  const ORG = options.org;

  const orgConfig = networkConfig[ORG];
  if(!orgConfig){
    throw new Error('No such organisation in config: '+ORG);
  }

  const PEERS = Object.keys(orgConfig).filter(k=>k.startsWith('peer'));
  const peersAddress = PEERS.map(p=>tools.getHost(networkConfig[ORG][p].requests));

  // log connections
  io.on('connection', function(socket){
    logger.debug('a new user connected:', socket.id);
    socket.on('disconnect', function(/*socket*/){
      logger.debug('user disconnected:', socket.id);
    });
  });

  //TODO: listen all peers, remove duplicates
  peerListener.init([peersAddress[0]], USERNAME, ORG);
  peerListener.registerBlockEvent(function(block){
    io.emit('chainblock', block);
  });

  // note: these statuses should be matched with client status set
  peerListener.eventHub.on('disconnected', function(){ io.emit('status', 'disconnected'); });
  peerListener.eventHub.on('connecting',   function(){ io.emit('status', 'connecting');   });
  peerListener.eventHub.on('connected',    function(){ io.emit('status', 'connected');    });

  peerListener.listen();

  io.on('connection', function(socket){
    socket.emit('status', peerListener.isConnected() ? 'connected':'disconnected' );
    // if(lastBlock){
    //   socket.emit('chainblock', lastBlock);
    // }
  });


  // setInterval(function(){
  //   socket.emit('ping', Date.now() );
  // }, 5000);
}
