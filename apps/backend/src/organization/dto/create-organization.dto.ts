export interface CreateOrganizationDto {
  name: string;
  email?: string;
  license?: string;
  active?: boolean;
}

export interface CreateOrganizationResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}