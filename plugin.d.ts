import { FastifyPluginCallback } from 'fastify';
import PiscinaLocks from 'piscina-locks';

export interface PiscinaLocksOptions {}

export interface LocksManager {
  request: typeof PiscinaLocks['request'],
  query: typeof PiscinaLocks['query']
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module "fastify" {
  interface FastifyInstance {
    locks: LocksManager;
  }
}

declare const piscinaLocksPlugin: FastifyPluginCallback<PiscinaLocksOptions>;
export default piscinaLocksPlugin;
