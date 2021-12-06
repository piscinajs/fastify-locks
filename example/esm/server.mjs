import Fastify from 'fastify';
import fastifyLocks from '../../esm-wrapper.mjs';

const fastify = Fastify({ logger: true });
fastify.register(fastifyLocks);

fastify.get('/', async () => {
  return await fastify.locks.request('example', () => 'hello world');
});

// Run the server!
fastify.listen(3000, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
