'use strict';

var Parent = require('./parent');

var Foo = function() {};

Foo.prototype = Parent.prototype;

module.exports = Foo;
