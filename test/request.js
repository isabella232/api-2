
var t = require('assert')
var http = require('http')
var client = require('@request/client')
var api = require('../')


describe('request', () => {
  var server

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      res.writeHead(202)
      res.end(req.url)
    })
    server.listen(6767, done)
  })

  it('basic', (done) => {
    var request = api({
      type: 'basic',
      define: {
        request: client
      }
    })

    request('http://localhost:6767', {qs: {a: 1}}, (err, res, body) => {
      t.equal(err, null)
      t.equal(res.statusCode, 202)
      t.equal(body, '/?a=1')
      done()
    })
  })

  it('chain', (done) => {
    var request = api({
      type: 'chain',
      define: {
        request: client
      }
    })

    request
      .get('http://localhost:6767')
      .qs({a: 1})
      .callback((err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 202)
        t.equal(body, '/?a=1')
        done()
      })
      .request()
  })

  it('wrap request method and pass a callback to it', (done) => {
    var request = api({
      type: 'chain',
      define: {
        request: (options, callback) => {
          if (callback) {
            options.callback = callback
          }
          return client(options)
        }
      }
    })

    request
      .get('http://localhost:6767')
      .qs({a: 1})
      .request((err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 202)
        t.equal(body, '/?a=1')
        done()
      })
  })

  it('wrap request method and return a Promise', (done) => {
    var request = api({
      type: 'chain',
      define: {
        request: (options) => {
          var promise = new Promise((resolve, reject) => {
            options.callback = (err, res, body) => {
              ;(err) ? reject(err) : resolve([res, body])
            }
          })
          client(options)
          return promise
        }
      }
    })

    request
      .get('http://localhost:6767')
      .qs({a: 1})
      .request()
      .then((result) => {
        var res = result[0]
        var body = result[1]
        t.equal(res.statusCode, 202)
        t.equal(body, '/?a=1')
        done()
      })
  })

  after((done) => {
    server.close(done)
  })
})
