import { MikroORM } from '@mikro-orm/core';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { OrganizationService } from '../services/organization.service.js';
import { OrganizationValidationService } from '../services/organization-validation.service.js';
import type { CreateOrganizationDto, CreateOrganizationResponse } from '../dto/create-organization.dto.js';

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor(orm: MikroORM) {
    this.organizationService = new OrganizationService(orm);
  }

  // GET /api/organizations
  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await this.organizationService.getAllOrganizations();
      return reply.send({ 
        success: true,
        ...result
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
      const stats = await this.organizationService.getStats();
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
      const result = await this.organizationService.getActiveOrganizations();
      return reply.send({ 
        success: true,
        ...result
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

      const result = await this.organizationService.searchOrganizations(name);
      return reply.send({ 
        success: true,
        ...result
      });
    } catch (error) {
      return reply.status(500).send({ 
        success: false, 
        error: 'Failed to search organizations' 
      });
    }
  }

  // POST /api/organizations
  async create(request: FastifyRequest, reply: FastifyReply): Promise<CreateOrganizationResponse> {
    try {
      // 1. Validar entrada
      const validation = OrganizationValidationService.validateCreateOrganization(request.body);
      if (!validation.isValid) {
        return reply.status(400).send({
          success: false,
          error: validation.errors.join(', ')
        });
      }

      // 2. Sanitizar datos
      const dto: CreateOrganizationDto = OrganizationValidationService.sanitizeCreateOrganization(request.body);

      // 3. Crear organización usando el servicio
      const organization = await this.organizationService.createOrganization(dto);

      return reply.status(201).send({
        success: true,
        data: organization,
        message: 'Organization created successfully'
      });

    } catch (error) {
      console.error('Error creating organization:', error);
      
      // Manejar errores de negocio específicos
      if (error instanceof Error && error.message === 'An organization with this name already exists') {
        return reply.status(409).send({
          success: false,
          error: error.message
        });
      }

      return reply.status(500).send({
        success: false,
        error: 'Failed to create organization'
      });
    }
  }
}