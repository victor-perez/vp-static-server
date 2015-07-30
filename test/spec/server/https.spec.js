var server      = require('../../../lib/server.js'),
    should      = require('should'),
    assert      = require('assert'),
    fs          = require('fs'),
    path        = require('path'),
    helpers     = require('../../helpers'),
    request     = require('supertest'),
    indexHTML   = String(fs.readFileSync(path.normalize(__dirname + '/../../test-data/index.html'))),
    index2HTML  = String(fs.readFileSync(path.normalize(__dirname + '/../../test-data/index2.html')));

//so we can use our own cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('HTTPS server.js', function () {

    context('static files', function (){
        var app = server({
                open: false,
                https: true
            });

        before(helpers.onConnect(app));
        after(helpers.close(app));

        it('should return the content of /test-data/test.txt', function (done) {
            helpers.agent(app)
            .get('/test-data/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });

        it('should return index.html', function (done) {
            helpers.agent(app)
            .get('/test-data/')
            .expect(200)
            .expect(indexHTML)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });

        it('should return a 404', function (done) {
            helpers.agent(app)
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
                host: '127.0.0.1',
                https: true
            });

        before(helpers.onConnect(app));
        after(helpers.close(app));        

        it('should return address 127.0.0.1', function () {
            assert.equal(helpers.getServer(app)[0].address().address, '127.0.0.1');
        });

        it('should return the content of /test-data/test.txt', function (done) {
            helpers.agent(app)
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
                port: 3002,
                https: true
            });
        
        before(helpers.onConnect(app));
        after(helpers.close(app));                

        it('should return port 3002', function () {
            assert.equal(helpers.getServer(app)[0].address().port, '3002');
        });

        it('should return the content of /test-data/test.txt', function (done) {
            helpers.agent(app)
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
                https: true,
                root: './test-data/'
            });
        
        before(helpers.onConnect(app));
        after(helpers.close(app));                

        it('should return the content of /test.txt', function (done) {
            helpers.agent(app)
            .get('/test.txt')
            .expect(200)
            .expect('Victor')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });


        it('should return index.html', function (done) {
            helpers.agent(app)
            .get('/')
            .expect(200)
            .expect(indexHTML)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });

    context('option: static.index', function (){
        var app = server({
                open: false,
                https: true,
                static: {
                    index: 'index2.html'
                }
            });
        
        before(helpers.onConnect(app));
        after(helpers.close(app));                

        it('should return index2.html', function (done) {
            helpers.agent(app)
            .get('/test-data/')
            .expect(200)
            .expect(index2HTML)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });


    context('option: static.setHeaders', function (){
        var app = server({
                open: false,
                https: true,
                static: {
                    setHeaders: function (res) {
                        res.set('X-HTTP-TEST', 'Perez');
                    }
                }
            });
        
        before(helpers.onConnect(app));
        after(helpers.close(app));                

        it('should have the header X-HTTP-TEST', function (done) {
            helpers.agent(app)
            .get('/test-data/')
            .expect(200)
            .expect('X-HTTP-TEST', 'Perez')
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });
});