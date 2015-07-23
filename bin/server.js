#!/usr/bin/env node
var server  = require('../src/server'),
    argv    = require('minimist')(process.argv.slice(2)),
    _       = require('underscore'),
    path    = require('path'),
    fs      = require('fs'),
    config  = argv.c || argv.config; //default config file
// CLI help
if (argv.h || argv.help) {
  console.log([
    "usage: vp-static-server [options]",
    "",
    "options:",
    "  -r   --root          Document root to use [./]",
    "  -a   --host          Address to use [0.0.0.0]",
    "  -p   --port          Port to use [3000]",
    "  -o   --open          Open server URL in your default browser [true]",
    "  -s   --https         Create a ssl server ( HTTPS ) [false]",
    "       --https-cert    CERT file for ssl server [ssl/127.0.0.1.cert]",
    "       --https-key     KEY file for ssl server [ssl/127.0.0.1.key]",
    "       --static-*      Express.static options:",
    "                       --static-dotfiles       [ignore]",
    "                       --static-etag           [true]",
    "                       --static-index          [index.html]",
    "                       --static-lastmodified   [true]",
    "                       --static-maxage         [0]",
    "                       --static-redirect       [true]",
    "                       more info http://expressjs.com/4x/api.html#express.static",
    "  -c   --config        Path to the configuration file",
    "  -h   --help          Print this list and exit.",
  ].join('\n'));
  process.exit();
}
//load config file
if (config) {
    config = require(path.normalize(process.cwd() + path.sep + config));
}
//parse options 
if (!config && process.argv.slice(2).length) {
    config = {
        static: {},
    };
    //root
    if (argv.r || argv.root) {
        config.root = argv.r || argv.root;
    }
    //host
    if (argv.a || argv.host) {
        config.host = argv.a || argv.host;
    }
    //port
    if (argv.p || argv.port) {
        config.port = argv.p || argv.port;
    }
    //open
    if (argv.o || argv.open) {
        config.open = argv.o || argv.open;
    }
    //set own cert & key
    if (argv['https-cert'] && argv['https-key']) {
        config.https = {
            key: fs.readFileSync(path.normalize(argv['https-key'])),
            cert: fs.readFileSync(path.normalize(argv['https-cert']))
        };
    }
    //https ( easy )
    if (!config.https && (argv.s || argv.https)) {
        config.https = true;
    }
    //static-dotfiles
    if (argv['static-dotfiles']) {
        config.static.dotfiles = argv['static-dotfiles'];
    }
    //static-etag
    if (!_.isUndefined(argv['static-etag'])) {
        config.static.etag = argv['static-etag'];
    }
    //static-index
    if (!_.isUndefined(argv['static-index'])) {
        config.static.index = argv['static-index'];
    }
    //static-lastmodified
    if (!_.isUndefined(argv['static-lastmodified'])) {
        config.static.lastModified = argv['static-lastmodified'];
    }
    //static-maxage
    if (!_.isUndefined(argv['static-maxage'])) {
        config.static.maxAge = argv['static-maxage'];
    }
    //static-redirect
    if (!_.isUndefined(argv['static-redirect'])) {
        config.static.redirect = argv['static-redirect'];
    }
}
//start server
server(config);