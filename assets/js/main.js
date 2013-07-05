requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    }
  },
  baseUrl:"/",
  paths: {
    'jquery'           : 'libs/jquery',
    'jquery-mobile'    : 'libs/jquery.mobile.min',
    'underscore'       : 'libs/underscore-amd',
    'socket'           : '/socket.io/socket.io',
    'Magnet'	         : 'js/magnet',
    'PhysicsObject'    : 'js/physicsObject',
    'PlayingField'     : 'js/playingField',
    'Vector'	         : 'js/vector',
    'Game'             : 'js/script',
    'Kinetic'	         : 'libs/kinetic.min'
  }
});

require(['Game']);
