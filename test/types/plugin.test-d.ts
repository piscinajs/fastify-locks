import Fastify from 'fastify';
import { expectError, expectType } from 'tsd';
import piscinaLocksPlugin, { LocksManager } from '../../plugin';

const app = Fastify();

app.register(piscinaLocksPlugin, {});

app.get('/', async (request, reply) => {
  return await app.locks.request('example', () => 'hello world');
});

app.after(() => {
  expectType<LocksManager>(app.locks);
  expectType<LocksManager['request']>(app.locks.request);
  expectType<LocksManager['query']>(app.locks.query);
});

const appThatTriggersTypescriptErrors = Fastify();

expectError(
  appThatTriggersTypescriptErrors.register(piscinaLocksPlugin, {
    unknownOption: 'I will trigger a typescript error'
  })
);
