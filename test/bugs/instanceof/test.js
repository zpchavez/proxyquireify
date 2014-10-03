'use strict';
/*jshint asi: true, browser: true */

var test       = require('tape');
var proxyquire = require('proxyquireify')(require);
var Parent     = require('./parent');
var Normal     = require('./child');
var Proxy      = proxyquire('./child', {});

test('Normal require returns constructor an instance of which passes instanceof test', function (t) {
    var normal = new Normal();

    t.equal((normal instanceof Parent), true, 'normal instanceof Parent === true');

    t.end();
})

test('Proxyquire returns constructor an instance of which passes instanceof test', function (t) {
    var proxy = new Proxy();

    t.equal((proxy instanceof Parent), true, 'proxy instanceof Parent === true');

    t.end();
})
