var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
  exec(success, error, 'HeartbeatPlugin', 'coolMethod', [arg0]);
};

var heartbeat = {};

module.exports.take = function (options, successCallback, errorCallback) {
  var args = [];
  args.push(options.seconds ? options.seconds : 10);
  args.push(options.fps ? options.fps : 30);
  exec(successCallback, errorCallback, 'HeartbeatPlugin', 'take', args);
};



(function(){
  try{
    if(typeof angular !== 'undefined'){
      angular.module('ngCordova.plugins.heartbeat', [])
        .factory('$cordovaHeartBeat', ['$q', '$window', function ($q, $window) {

          return {

            take: function (options) {
              var q = $q.defer();
              heartbeat.take(options,
                function (bpm) {
                  q.resolve(bpm);
                }, function (error) {
                  q.reject(err);
                }
              );
              return q.promise;
            }

          };

        }]);
      angular.module('ngCordova.plugins').requires.push('ngCordova.plugins.HeartbeatPlugin');
      console.log("[HeartBeat]: ngCordova plugin loaded");
    }
  } finally {
  }
})();

