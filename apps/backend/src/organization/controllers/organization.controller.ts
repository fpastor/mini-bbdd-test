import { MikroORM } from '@mikro-orm/core';
import { Organization } from '../entities/organization.entity.js';
import { OrganizationRepository } from '../repositories/organization.repository.js';
import type { FastifyRequest, FastifyReply } from 'fastify';

export class OrganizationController {
  constructor(private orm: MikroORM) {}

  // GET /api/organizations
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const em = this.orm.em.fork();
      const organizations = await em.find(Organization, {});
      
      return reply.send({ 
        success: true,
        data: organizations,
        count: organizations.length
      });
    } catch (error) {
      return reply.status(500).send({ 
        success: false, 
        error: 'Failed to fetch organizations' 
      });
    }
  }

  // GET /api/organizations/stats  
  async getStats(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const em = this.orm.em.fork();
      const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
      
      const stats = await organizationRepo.getStats();
      
      return reply.send({ 
        success: true,
        data: stats 
      });
    } catch (error) {
      return reply.status(500).send({ 
        success: false, 
        error: 'Failed to fetch statistics' 
      });
    }
  }

  // GET /api/organizations/active
  async getActive(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const em = this.orm.em.fork();
      const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
      
      const activeOrgs = await organizationRepo.findActive();
      
      return reply.send({ 
        success: true,
        data: activeOrgs,
        count: activeOrgs.length
      });
    } catch (error) {
      return reply.status(500).send({ 
        success: false, 
        error: 'Failed to fetch active organizations' 
      });
    }
  }

  // GET /api/organizations/search?name=xxx
  async search(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = request.query as { name?: string };
      
      if (!name) {
        return reply.status(400).send({ 
          success: false, 
          error: 'Name parameter is required' 
        });
      }

      const em = this.orm.em.fork();
      const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
      
      const organizations = await organizationRepo.findByNameContaining(name);
      
      return reply.send({ 
        success: true,
        data: organizations,
        count: organizations.length,
        query: name
      });
    } catch (error) {
      return reply.status(500).send({ 
        success: false, 
        error: 'Failed to search organizations' 
      });
    }
  }
}