import type { FastifyPluginAsync } from 'fastify';
import { MikroORM } from '@mikro-orm/core';
import { OrganizationController } from '../controllers/organization.controller.js';

export interface OrganizationRoutesOptions {
  orm: MikroORM;
}

export const organizationRoutes: FastifyPluginAsync<OrganizationRoutesOptions> = async (
  fastify,
  options
) => {
  const { orm } = options;
  const controller = new OrganizationController(orm);

  // GET /api/organizations
  fastify.get('/', controller.getAll.bind(controller));

  // GET /api/organizations/stats
  fastify.get('/stats', controller.getStats.bind(controller));

  // GET /api/organizations/active
  fastify.get('/active', controller.getActive.bind(controller));

  // GET /api/organizations/search?name=xxx
  fastify.get('/search', controller.search.bind(controller));

  // POST /api/organizations
  fastify.post('/', controller.create.bind(controller));
};