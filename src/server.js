/* jshint node: true */
'use static';
var express = require('express'),
    _ = require('underscore'),
    colors = require('colors'),
    http  = require('http'),
    open = require('open'),
    util = require('util');
/**
 * @param  {String|Object} configuration
 * @return {Object} express application
 */
module.exports = function (configuration)  {
    var config = _.isString(configuration) ? require(configuration) : configuration || {},
        app = express(),
        server, url;
    /**
     * Open URL in default browser
     * @param  {String} host
     * @param  {Number} port
     */
    function openUrl (host, port) {
        //replace 0.0.0.0
        if (host === '0.0.0.0') {
            host = '127.0.0.1';
        }
        //replace port 80
        if (port === 80) {
            open('http://' + host);
        } else {
            open('http://' + host + ':' + port);
        }

    }
    //set default values²
    config = _.defaults(config, {
        root: './',
        static: {}, //http://expressjs.com/4x/api.html#express.static
        host: '0.0.0.0',
        port: 3000,
        open: true
    });
    //set static path
    app.use(express.static(config.root, config.static));
    //start dev app
    server = http.createServer(app).listen(config.port, config.host, function () {
        var host = server.address().address,
            port = server.address().port;
        //set url
        url = util.format('http://%s:%s', host, port);
        //log
        console.log( colors.magenta('vp-simple-server') + ' listening at ' + colors.green(url), host, port);
        //open URL in default browser?²
        if (config.open) {
            openUrl(host, port);
        }
    });
    //return the express application
    return app;
};