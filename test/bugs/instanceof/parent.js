'use strict';

var Parent = function() {};

Parent.prototype = {'foo' : function() {return 'bar';}};

module.exports = Parent;
