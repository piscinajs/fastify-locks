# fastify-locks - A Piscina Locks plugin for Fastify

## Example

```js
const fastify = require('fastify')();

fastify.register(require('fastify-locks'), {});

// Declare a route
fastify.get('/', async (request, reply) => {
  await fastify.locks.request('hello', () => {
    // Do something that requires an exclusive lock,
    // such as updating a shared resource.
  });
  reply.send('hello world');
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
```

Once registered, the plugin decorates the `fastify` instance
with a new `locks` property:

* `fastify.locks.request(name[, options], callback)`
* `fastify.locks.query()`

See the [Piscina-locks docs][] for more information.

## The Team

* James M Snell <jasnell@gmail.com>

## Acknowledgements

Piscina development is sponsored by [NearForm Research][].

[Piscina-locks docs]: https://github.com/piscinajs/piscina-locks
[NearForm Research]: https://www.nearform.com/research/
