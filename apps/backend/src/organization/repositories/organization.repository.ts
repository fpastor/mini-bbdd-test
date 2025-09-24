import { EntityRepository } from '@mikro-orm/sqlite';
import { Organization } from '../entities/organization.entity.js';

export class OrganizationRepository extends EntityRepository<Organization> {
  
  // Buscar organizaciones activas
  async findActive(): Promise<Organization[]> {
    return this.find({ active: true });
  }

  // Buscar organizaciones inactivas
  async findInactive(): Promise<Organization[]> {
    return this.find({ active: false });
  }

  // Buscar por nombre (case insensitive)
  async findByNameContaining(searchTerm: string): Promise<Organization[]> {
    return this.createQueryBuilder()
      .where('LOWER(name) LIKE LOWER(?)', [`%${searchTerm}%`])
      .getResultList();
  }

  // Buscar por email exacto
  async findByEmail(email: string): Promise<Organization | null> {
    return this.findOne({ email });
  }

  // Buscar por license
  async findByLicense(license: string): Promise<Organization | null> {
    return this.findOne({ license });
  }

  // Verificar si existe una organización con ese nombre
  async existsByName(name: string): Promise<boolean> {
    const count = await this.count({ name });
    return count > 0;
  }

  // Verificar si existe una organización con ese email
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ email });
    return count > 0;
  }

  // Obtener estadísticas básicas
  async getStats(): Promise<{ total: number; active: number; inactive: number }> {
    const total = await this.count({});
    const active = await this.count({ active: true });
    const inactive = total - active;
    
    return { total, active, inactive };
  }

  // Buscar organizaciones creadas en un rango de fechas
  async findCreatedBetween(startDate: Date, endDate: Date): Promise<Organization[]> {
    return this.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }
}