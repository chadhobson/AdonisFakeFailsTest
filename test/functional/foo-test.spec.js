'use strict'

const { ioc } = use('@adonisjs/fold');
const { test, trait } = use('Test/Suite')('GetFooRequest');

trait('Test/ApiClient');

test('Make a request with a fake', async ({ assert, client }) => {

  // Add our fake
  ioc.fake('App/Library/Foo', () => {
    return {
      bar() {
        return 'From the fake'
      }
    }
  });

  // Make the request
  const response = await client
    .get(`/foo`)
    .type('json')
    .accept('json')
    .end();

  // Restore the original class
  ioc.restore('App/Library/Foo');

  assert.equal(response.text, 'From the fake')

})

test('Make the same request again without a fake', async ({ assert, client }) => {

  // No fake this time, should hit the real class
  const response = await client
    .get(`/foo`)
    .type('json')
    .accept('json')
    .end();

  // This fails
  assert.equal(response.text, 'From the class')
})
