import { expectAssignable, expectType } from 'tsd';

import fastify from 'fastify';
import PiscinaLocks from 'piscina-locks';

import Plugin, {
  PiscinaLocksManager,
  PiscinaLocksOptions,
  PiscinaLocksPlugin,
} from '..';

const app = fastify();
const opts = {
  /* ... */
} as PiscinaLocksOptions;

app.register(Plugin, opts);
app.register(PiscinaLocksPlugin, opts);

app.get('/', function (req, res) {
  expectType<PiscinaLocksManager>(this.locks);
  expectType<PiscinaLocksManager>(this.locks);
  expectAssignable<typeof PiscinaLocks.query>(this.locks.query);
  expectAssignable<typeof PiscinaLocks.request>(this.locks.request);
});

expectType<PiscinaLocksManager>(app.locks);
expectType<PiscinaLocksManager>(app.locks);
expectAssignable<typeof PiscinaLocks.query>(app.locks.query);
expectAssignable<typeof PiscinaLocks.request>(app.locks.request);
