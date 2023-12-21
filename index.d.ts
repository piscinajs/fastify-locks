/// <reference types="node" />
import PiscinaLocks from 'piscina-locks';
import { FastifyPluginCallback } from 'fastify';

export interface PiscinaLocksOptions {}

export interface PiscinaLocksManager {
  request: (typeof PiscinaLocks)['request'];
  query: (typeof PiscinaLocks)['query'];
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
  interface FastifyInstance {
    locks: PiscinaLocksManager;
  }
}

export const PiscinaLocksPlugin: FastifyPluginCallback<PiscinaLocksOptions>;
export default PiscinaLocksPlugin;
