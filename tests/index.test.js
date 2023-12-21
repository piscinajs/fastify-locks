const tap = require('tap');
const fastify = require('fastify');

tap.test('fastify-locks', async (t) => {
  t.plan(4);

  const app = fastify();
  app.register(require('..'));

  app.route({
    method: 'GET',
    url: '/locks',
    handler: async (_request, reply) => {
      t.ok(app.hasDecorator('locks'));
      t.type(app.locks.query, Function);
      t.type(app.locks.request, Function);

      reply.send({ locks: app.hasDecorator('locks') });
    }
  });

  const response = await app.inject('/locks');
  const payload = response.json();

  t.strictSame(payload, { locks: true });
});
