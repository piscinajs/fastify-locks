import { test } from 'tap';
import Fastify from 'fastify';
import fastifyLocksPlugin from '../esm-wrapper.mjs';

test('It should correctly add fastify decorators - ESM', async (t) => {
  t.plan(3);

  const fastify = Fastify();
  await fastify.register(fastifyLocksPlugin);

  t.teardown(fastify.close.bind(fastify));

  await fastify.ready();

  t.ok(fastify.locks);
  t.ok(fastify.locks.request);
  t.ok(fastify.locks.query);
});

test('It should throw when trying to register the plugin more than once - ESM', (t) => {
  t.plan(1);

  const fastify = Fastify();
  fastify.register(fastifyLocksPlugin).register(fastifyLocksPlugin);

  fastify.ready((err) => {
    t.equal(err.message, 'fastify-locks has already been registered');
  });
});

test('It should be able to use piscina-locks request - ESM', async (t) => {
  t.plan(2);

  const fastify = Fastify();
  await fastify.register(fastifyLocksPlugin);

  t.teardown(fastify.close.bind(fastify));

  fastify.get('/', async (request, reply) => {
    return await fastify.locks.request('example', () => 'hello world');
  });

  await fastify.ready();

  const response = await fastify.inject({
    method: 'GET',
    path: '/'
  });
  t.equal(response.statusCode, 200);
  t.equal(response.payload, 'hello world');
});

test('It should be able to use piscina-locks query - CommonJS', async (t) => {
  t.plan(3);

  const fastify = Fastify();
  await fastify.register(fastifyLocksPlugin);

  t.teardown(fastify.close.bind(fastify));

  fastify.locks.request('held', () => setTimeout(() => 'hello world', 2000));

  const debug = fastify.locks.query();
  t.same(debug.held, [{ name: 'held', mode: 'exclusive' }]);

  fastify.get('/', async (request, reply) => {
    return await fastify.locks.request('example', () => 'hello world');
  });

  await fastify.ready();

  const response = await fastify.inject({
    method: 'GET',
    path: '/'
  });
  t.equal(response.statusCode, 200);
  t.equal(response.payload, 'hello world');
});
