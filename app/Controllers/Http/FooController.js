'use strict'

const FooClass = use('App/Library/Foo')

class FooController {

  getFoo({request, response}) {
    return response.json(FooClass.bar());
  }
}

module.exports = FooController
