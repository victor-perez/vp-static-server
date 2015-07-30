var server      = require('../../../lib/server.js'),
    should      = require('should'),
    assert      = require('assert'),
    fs          = require('fs'),
    path        = require('path'),
    helpers     = require('../../helpers'),
    indexHTML   = String(fs.readFileSync(path.normalize(__dirname + '/../../test-data/index.html'))),
    index2HTML   = String(fs.readFileSync(path.normalize(__dirname + '/../../test-data/index2.html')));


describe('HTTP server.js', function () {

    context('static files', function (){
        var app = server({
                open: false
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
                host: '127.0.0.1'
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
                port: 3001
            });
        
        before(helpers.onConnect(app));
        after(helpers.close(app));                

        it('should return port 3001', function () {
            assert.equal(helpers.getServer(app)[0].address().port, '3001');
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