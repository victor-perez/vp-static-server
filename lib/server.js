/* jshint node: true */
'use static';
var express     = require('express'),
    _           = require('underscore'),
    colors      = require('colors'),
    http        = require('http'),
    https       = require('https'),
    open        = require('opn'),
    util        = require('util'),
    path        = require('path'),
    fs          = require('fs');
/**
 * @param  {Object}         [configuration]     server configuration
 * @param  {Boolean}        [autostart=true]    if set to false you need to call serevr.vpStart()
 * @return {Object} express application
 */
module.exports = function (configuration, autostart = true)  {
    var config = configuration || {},
        app = express(),
        server, url, started;
    /**
     * Open URL in default browser
     * @param  {String} host
     * @param  {Number} port
     */
    function openUrl (host, port, proto) {
        //replace 0.0.0.0
        if (host === '0.0.0.0') {
            host = '127.0.0.1';
        }
        //open on default HTTP port
        if (port === 80 && proto === 'http') {
            open('http://' + host);
        //open on default HTTPS port
        } else if (port === 443 && proto === 'https') {
            open('https://' + host);
        } else {
            open(util.format('%s://%s:%s', proto, host, port));
        }
    }
    /**
     * Start listing
     * @return {Object} express application
     */
    function start () {
        //check of server is already started
        if (started) {
            console.log(colors.red('vp-simple-server is already started'));
            return app;
        }
        //set static path
        app.use(express.static(config.root, config.static));
        //set start to true
        started = true;
        //start listing
        server.listen({
            port: config.port,
            host: config.host
        }, function () {
            var host = server.address().address,
                port = server.address().port,
                proto = config.https ? 'https' : 'http';
            //set url
            url = util.format('%s://%s:%s', proto, host, port);
            //log
            console.log(colors.magenta('vp-simple-server') + ' listening at ' + colors.green(url));
            //open URL in default browser?²
            if (config.open) {
                openUrl(host, port, proto);
            }
        });
        return app;
    }
    //set default values
    config = _.defaults(config, {
        root: './',
        static: {}, //http://expressjs.com/4x/api.html#express.static
        host: '0.0.0.0',
        port: 0,
        open: true,
        https: false
    });
    //if HTTPS is true set default dummy key and cert
    if (config.https === true) {
        config.https = {
            key: fs.readFileSync(path.normalize(__dirname + '/../ssl/127.0.0.1.key')),
            cert: fs.readFileSync(path.normalize(__dirname + '/../ssl/127.0.0.1.cert'))
        };
    }
    //create server
    if (config.https) {
        server = https.createServer(config.https, app);
        app.set('https', server);
    } else {
        server = http.createServer(app);
        app.set('http', server);
    }
    //autostart ? then lets start the app
    if (autostart) {
        return start();
    }
    //add vpStart method for delay started
    app.vpStart = start;
    //return the Express application
    return app;
};
