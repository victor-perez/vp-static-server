var server      = require('../../src/server.js'),
    request     = require('supertest'),
    should      = require('should'),
    assert      = require('assert'),
    fs          = require('fs'),
    path        = require('path'),
    util        = require('util'),
    indexHTML   = String(fs.readFileSync(path.normalize(__dirname + '/../test-data/index.html')));

function getServer (app) {
    var server = app.get('http');
    return [server || app.get('https'), !server];
}

function close (app) {
    return function (done) {
        getServer(app)[0].close(done);
    };
}
function onConnect (app) {
    return function (done) {
        getServer(app)[0].getConnections(done);
    };
}
function agent(app) {
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
}


describe('HTTP server.js', function () {

    context('static files', function (){
        var app = server({
                open: false
            });

        before(onConnect(app));
        after(close(app));

        it('should return the content of /test-data/test.txt', function (done) {
            agent(app)
            .get('/test-data/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });

        it('should return index.html', function (done) {
            agent(app)
            .get('/test-data/')
            .expect(200)
            .expect(indexHTML)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });

        it('should return a 404', function (done) {
            agent(app)
            .get('/test-data/404')
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });

    context('option: host', function (){
        var app = server({
                open: false,
                host: '127.0.0.1'
            });

        before(onConnect(app));
        after(close(app));        

        it('should return address 127.0.0.1', function () {
            assert.equal(getServer(app)[0].address().address, '127.0.0.1');
        });

        it('should return the content of /test-data/test.txt', function (done) {
            agent(app)
            .get('/test-data/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });

    context('option: port', function (){
        var app = server({
                open: false,
                port: 3001
            });
        
        before(onConnect(app));
        after(close(app));                

        it('should return port 3001', function () {
            assert.equal(getServer(app)[0].address().port, '3001');
        });

        it('should return the content of /test-data/test.txt', function (done) {
            agent(app)
            .get('/test-data/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });

    context('option: root', function (){
        var app = server({
                open: false,
                root: './test-data/'
            });
        
        before(onConnect(app));
        after(close(app));                

        it('should return the content of /test.txt', function (done) {
            agent(app)
            .get('/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });


        it('should return index.html', function (done) {
            agent(app)
            .get('/')
            .expect(200)
            .expect(indexHTML)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });
});