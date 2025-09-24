import { MikroORM } from '@mikro-orm/core';
import { Organization } from '../entities/organization.entity.js';
import { OrganizationRepository } from '../repositories/organization.repository.js';
import type { CreateOrganizationDto } from '../dto/create-organization.dto.js';

export class OrganizationService {
  constructor(private orm: MikroORM) {}

  async createOrganization(dto: CreateOrganizationDto): Promise<Organization> {
    const em = this.orm.em.fork();
    const organizationRepo = em.getRepository(Organization) as OrganizationRepository;

    // Verificar si ya existe una organización con el mismo nombre
    const existingOrg = await organizationRepo.existsByName(dto.name);
    if (existingOrg) {
      throw new Error('An organization with this name already exists');
    }

    // Crear la nueva organización
    const organization = new Organization(
      dto.name,
      dto.email || undefined,
      dto.license || undefined
    );

    // Establecer el estado activo si se proporciona
    if (dto.active !== undefined) {
      organization.active = dto.active;
    }

    await em.persistAndFlush(organization);
    return organization;
  }

  async getAllOrganizations(): Promise<{ data: Organization[]; count: number }> {
    const em = this.orm.em.fork();
    const organizations = await em.find(Organization, {});
    return { data: organizations, count: organizations.length };
  }

  async getStats() {
    const em = this.orm.em.fork();
    const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
    return await organizationRepo.getStats();
  }

  async getActiveOrganizations(): Promise<{ data: Organization[]; count: number }> {
    const em = this.orm.em.fork();
    const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
    const activeOrgs = await organizationRepo.findActive();
    return { data: activeOrgs, count: activeOrgs.length };
  }

  async searchOrganizations(name: string): Promise<{ data: Organization[]; count: number; query: string }> {
    const em = this.orm.em.fork();
    const organizationRepo = em.getRepository(Organization) as OrganizationRepository;
    const organizations = await organizationRepo.findByNameContaining(name);
    return { data: organizations, count: organizations.length, query: name };
  }
}