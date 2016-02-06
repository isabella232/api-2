
# @request/api

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]

Use this module to create sugar API for your HTTP client. You can also allow your users to define their own method aliases.

```js
var api = require('@request/api')
var client = require('@request/client')

var config = {
  // HTTP verb methods
  verb: {
    get: ['select']
  },
  // option methods
  option: {
    qs: ['where'],
    callback: ['done']
  },
  // custom methods
  custom: {
    submit: ['gimme']
  }
}


function submit () {
  // `this` contains the options object that you usually pass to @request/core
  return client(this)
}

var request = api(config, submit)

request
  .select('http://localhost:6767')
  .where({a: 'b'})
  .done((err, res, body) => {
    // aaa
    // mazing
  })
  .gimme()
```

> See [@request/core][request-core] for more details.


  [npm-version]: http://img.shields.io/npm/v/@request/api.svg?style=flat-square (NPM Version)
  [travis-ci]: https://img.shields.io/travis/request/api/master.svg?style=flat-square (Build Status)
  [coveralls-status]: https://img.shields.io/coveralls/request/api.svg?style=flat-square (Test Coverage)

  [npm]: https://www.npmjs.org/package/@request/api
  [travis]: https://travis-ci.org/request/api
  [coveralls]: https://coveralls.io/r/request/api?branch=master

  [request-core]: https://github.com/request/core
