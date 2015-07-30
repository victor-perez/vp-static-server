var request = require('supertest'),
    util        = require('util');

function getServer (app) {
    var server = app.get('http');
    return [server || app.get('https'), !server];
}

exports.getServer = getServer;

exports.close = function (app) {
    return function (done) {
        getServer(app)[0].close(done);
    };
};

exports.onConnect = function (app) {
    return function (done) {
        getServer(app)[0].getConnections(done);
    };
};

exports.agent = function (app) {
    var server = getServer(app),
        proto = server[1] ? 'https' : 'http',  
        host = server[0].address().address,
        port = server[0].address().port;
    //fix local host
    if (host === '0.0.0.0') {
        host = '127.0.0.1';
    }
    //return request
    return request(
        util.format('%s://%s:%s', proto, host, port)
    );
};