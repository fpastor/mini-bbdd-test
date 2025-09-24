import type { CreateOrganizationDto } from '../dto/create-organization.dto.js';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class OrganizationValidationService {
  static validateCreateOrganization(data: any): ValidationResult {
    const errors: string[] = [];

    // Validar que data existe
    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Invalid request body'] };
    }

    // Validar nombre
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }

    // Validar email si se proporciona
    if (data.email !== undefined) {
      if (typeof data.email !== 'string') {
        errors.push('Email must be a string');
      } else if (data.email.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email.trim())) {
          errors.push('Email must have a valid format');
        }
      }
    }

    // Validar license si se proporciona
    if (data.license !== undefined && typeof data.license !== 'string') {
      errors.push('License must be a string');
    }

    // Validar active si se proporciona
    if (data.active !== undefined && typeof data.active !== 'boolean') {
      errors.push('Active must be a boolean');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizeCreateOrganization(data: any): CreateOrganizationDto {
    return {
      name: data.name?.trim() || '',
      email: data.email?.trim() || undefined,
      license: data.license?.trim() || undefined,
      active: data.active !== undefined ? data.active : true
    };
  }
}