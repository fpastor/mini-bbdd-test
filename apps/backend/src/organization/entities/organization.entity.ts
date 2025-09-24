import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { OrganizationRepository } from '../repositories/organization.repository.js';

@Entity({ 
  tableName: 'organization',
  repository: () => OrganizationRepository
})
export class Organization {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'varchar', nullable: false })
  name!: string;

  @Property({ type: 'varchar', nullable: true })
  email?: string;

  @Property({ type: 'varchar', nullable: true })
  license?: string;

  @Property({ type: 'boolean', default: true })
  active: boolean = true;

  @Property({ type: 'timestamp', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(name: string, email?: string, license?: string) {
    this.name = name;
    this.email = email;
    this.license = license;
  }

  // Helper methods
  isActive(): boolean {
    return this.active;
  }

  deactivate(): void {
    this.active = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.active = true;
    this.updatedAt = new Date();
  }

  updateInfo(name?: string, email?: string, license?: string): void {
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    if (license !== undefined) this.license = license;
    this.updatedAt = new Date();
  }
}