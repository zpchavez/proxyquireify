// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function(modules, cache, entry) {

    function innerReq(name, jumped){

        if(!cache[name]) {

            console.log('not found in cache', name, cache);

            if(!modules[name]) {
              
              console.log('not found in modules', name, modules);

              // if we cannot find the item within our internal map jump to
              // current root require go all requires down from there
              var rootRequire = typeof require == "function" && require;

              if (!jumped && rootRequire) return rootRequire(name, true);

              throw new Error('Cannot find module \'' + name + '\'');
            }

            var m = cache[name] = { exports: {} };

            modules [name] [0] (
                function(x){
                  var id = modules[name][1][x];
                  return innerReq(id ? id : x);
                }
              , m
              , m.exports
            );
        }
        return cache[name].exports;
    }

    for(var i = 0; i < entry.length; i++) {
      console.log('innerReq', entry[i]);
      innerReq(entry[ i ]);
    }

    return innerReq;
})

(
  {
    test: [
        function(require,module,exports){
          var foo = require('./src/foo');
          console.log(foo());

        }
      , {"./src/foo":'foo'}
      ]
  , foo: [
        function(require,module,exports){
          var bar = require('./bar');

          module.exports = function () {
            return bar.wunder();
          };

        }
      , {"./bar":'bar'}
      ]
  , bar: [
        function(require,module,exports){
          exports.wunder = function () { 
            return 'wunderbar'; 
          };

        }
      ,{}
      ]
  }

, {}  // cache

, [ 'test' ] // entry === ./src/foo.js
)
;