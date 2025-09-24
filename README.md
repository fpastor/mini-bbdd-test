# Mini BBDD Test 🚀

Un proyecto de práctica que demuestra una arquitectura moderna de **fullstack** con separación clara entre frontend y backend, usando **TypeScript**, **MikroORM**, **Vite** y **Fastify**.

## 📋 Descripción

Este proyecto implementa una aplicación web completa con:
- **Frontend**: Aplicación web moderna con Vite y TypeScript
- **Backend**: API REST con Fastify, MikroORM y SQLite
- **Base de datos**: SQLite con entidades TypeScript y migraciones automáticas
- **Arquitectura modular**: Organización por dominios con patrón MVC
- **APIs RESTful**: Endpoints completamente funcionales con validación

## 🏗️ Arquitectura del Proyecto

```
mini-bbdd-test/
├── apps/
│   ├── frontend/          # Aplicación web (Vite + TypeScript)
│   │   ├── src/
│   │   ├── public/
│   │   ├── index.html
│   │   └── package.json
│   └── backend/           # API REST (Fastify + MikroORM)
│       ├── src/
│       │   ├── organization/     # Módulo Organization (MVC completo)
│       │   │   ├── entities/     # Entidades TypeScript + decoradores
│       │   │   │   └── organization.entity.ts
│       │   │   ├── repositories/ # Consultas personalizadas
│       │   │   │   └── organization.repository.ts
│       │   │   ├── services/     # Lógica de negocio + validaciones
│       │   │   │   ├── organization.service.ts
│       │   │   │   └── organization-validation.service.ts
│       │   │   ├── controllers/  # Controladores HTTP (refactorizados)
│       │   │   │   └── organization.controller.ts
│       │   │   ├── dto/          # Data Transfer Objects
│       │   │   │   └── create-organization.dto.ts
│       │   │   └── routes/       # Definición de rutas Fastify
│       │   │       └── organization.routes.ts
│       │   ├── server.ts         # Servidor principal + configuración
│       │   └── mikro-orm.config.ts # Configuración ORM
│       ├── data/          # Base de datos SQLite
│       │   └── database.sqlite
│       └── package.json
├── infra/
│   └── dev/              # Docker compose para herramientas
│       └── docker-compose.yml
└── package.json          # Workspace root
```

## 🚀 Tecnologías

### Frontend
- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático
- **CSS3** - Estilos

### Backend  
- **Fastify** - Framework web rápido
- **MikroORM** - ORM moderno para TypeScript
- **SQLite** - Base de datos embebida
- **TypeScript** - Tipado estático
- **reflect-metadata** - Decoradores y metadatos

### DevOps
- **npm workspaces** - Monorepo
- **Docker Compose** - SQLite Admin (opcional)
- **ESM** - Módulos ES nativos

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm 8+

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd mini-bbdd-test
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Construir el backend:**
   ```bash
   npm run build --workspace=backend
   ```

## 🎮 Uso

### Desarrollo

#### Arrancar ambos servicios:
```bash
npm run dev
```

#### Arrancar servicios por separado:

**Frontend** (puerto 5173):
```bash
npm run dev:frontend
```

**Backend** (puerto 3000):
```bash
npm run dev:backend
```

### Producción

```bash
# Construir todo
npm run build

# Arrancar backend
npm run start --workspace=backend
```

## 🌐 API Endpoints

### Base URL: `http://localhost:3000/api`

#### Organizations Module

| Método | Endpoint | Descripción | Parámetros | Estado |
|--------|----------|-------------|------------|--------|
| `GET` | `/organizations` | Lista todas las organizaciones | - | ✅ |
| `GET` | `/organizations/stats` | Estadísticas de organizaciones | - | ✅ |
| `GET` | `/organizations/active` | Solo organizaciones activas | - | ✅ |
| `GET` | `/organizations/search` | Búsqueda por nombre | `?name=texto` | ✅ |
| `POST` | `/organizations` | Crear nueva organización | JSON body | ✅ |

### Ejemplos de uso:

**GET /api/organizations**
```bash
curl http://localhost:3000/api/organizations
```
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "TechCorp Solutions",
      "email": "contact@techcorp.com",
      "license": "MIT",
      "active": true,
      "createdAt": "2024-09-24T14:30:00.000Z",
      "updatedAt": "2024-09-24T14:30:00.000Z"
    }
  ],
  "count": 1
}
```

**GET /api/organizations/stats**
```bash
curl http://localhost:3000/api/organizations/stats
```
```json
{
  "data": {
    "total": 3,
    "active": 3,
    "inactive": 0
  }
}
```

**GET /api/organizations/search?name=Tech**
```bash
curl "http://localhost:3000/api/organizations/search?name=Tech"
```
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "TechCorp Solutions",
      "email": "contact@techcorp.com",
      "license": "MIT",
      "active": true,
      "createdAt": "2024-09-24T14:30:00.000Z",
      "updatedAt": "2024-09-24T14:30:00.000Z"
    }
  ],
  "count": 1
}
```

**POST /api/organizations**
```bash
curl -X POST http://localhost:3000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nueva Empresa",
    "email": "contact@nuevaempresa.com",
    "license": "MIT",
    "active": true
  }'
```
```json
{
  "success": true,
  "data": {
    "id": "8f7e6d5c-4b3a-2918-7654-321098765432",
    "name": "Nueva Empresa",
    "email": "contact@nuevaempresa.com",
    "license": "MIT",
    "active": true,
    "createdAt": "2025-09-24T15:30:00.000Z",
    "updatedAt": "2025-09-24T15:30:00.000Z"
  },
  "message": "Organization created successfully"
}
```

**Validaciones POST:**
- ✅ Nombre obligatorio y único
- ✅ Email con formato válido (opcional)
- ✅ License como string (opcional)
- ✅ Active como boolean (por defecto: true)

## 🗄️ Base de Datos

### Entidades

#### Organization
```typescript
{
  id: string           // UUID (PK)
  name: string         // Nombre (requerido)
  email?: string       // Email (opcional)
  license?: string     // Licencia (opcional) 
  active: boolean      // Estado activo (default: true)
  createdAt: Date      // Fecha creación (auto)
  updatedAt: Date      // Fecha actualización (auto)
}
```

### Esquema SQLite

La base de datos se crea automáticamente en `apps/backend/data/database.sqlite` al arrancar el servidor.

## 🛠️ Scripts Disponibles

### Root (Workspace)
```bash
npm run dev              # Arrancar frontend + backend
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend  
npm run build           # Construir todos los workspaces
```

### Frontend
```bash
npm run dev --workspace=frontend      # Servidor de desarrollo
npm run build --workspace=frontend    # Construir para producción
npm run preview --workspace=frontend  # Vista previa del build
```

### Backend
```bash
npm run dev --workspace=backend       # Servidor con auto-reload
npm run build --workspace=backend     # Compilar TypeScript
npm run start --workspace=backend     # Servidor de producción
```

## 🔧 Herramientas de Desarrollo

### SQLite Admin (Opcional)

Para visualizar la base de datos:

```bash
# Arrancar SQLite Admin
npm run task "🚀 Start SQLite Admin"

# Parar SQLite Admin  
npm run task "🛑 Stop SQLite Admin"
```

Acceder en: `http://localhost:8080`

## 🏛️ Arquitectura y Patrones

### Modularidad por Dominio
- Cada módulo de negocio (ej: `organization`) contiene toda su lógica
- Separación clara: entities, repositories, controllers, routes
- Arquitectura MVC (Model-View-Controller) completa
- Fácil escalabilidad añadiendo nuevos módulos

### Patrón Repository
```typescript
@Repository(Organization)
class OrganizationRepository extends EntityRepository<Organization> {
  async findActive(): Promise<Organization[]> {
    return this.find({ active: true });
  }
  
  async findByNameContaining(search: string): Promise<Organization[]> {
    return this.createQueryBuilder()
      .where('LOWER(name) LIKE LOWER(?)', [`%${search}%`])
      .getResultList();
  }

  async getStats() {
    const total = await this.count({});
    const active = await this.count({ active: true });
    return { total, active, inactive: total - active };
  }
}
```

### Patrón Service (Lógica de Negocio)
```typescript
export class OrganizationService {
  constructor(private orm: MikroORM) {}

  async createOrganization(dto: CreateOrganizationDto): Promise<Organization> {
    const em = this.orm.em.fork();
    const organizationRepo = em.getRepository(Organization) as OrganizationRepository;

    // Verificar duplicados
    const existingOrg = await organizationRepo.existsByName(dto.name);
    if (existingOrg) {
      throw new Error('An organization with this name already exists');
    }

    // Crear y persistir
    const organization = new Organization(dto.name, dto.email, dto.license);
    if (dto.active !== undefined) organization.active = dto.active;
    
    await em.persistAndFlush(organization);
    return organization;
  }
}
```

### DTOs y Validación
```typescript
// DTO para tipado fuerte
export interface CreateOrganizationDto {
  name: string;
  email?: string;
  license?: string;
  active?: boolean;
}

// Servicio de validación reutilizable
export class OrganizationValidationService {
  static validateCreateOrganization(data: any): ValidationResult {
    const errors: string[] = [];
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    if (data.email && data.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        errors.push('Email must have a valid format');
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }
}
```

### Patrón Controller (Refactorizado)
```typescript
export class OrganizationController {
  private organizationService: OrganizationService;

  constructor(orm: MikroORM) {
    this.organizationService = new OrganizationService(orm);
  }

  // POST /api/organizations - Limpio y con separación de responsabilidades
  async create(request: FastifyRequest, reply: FastifyReply) {
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
      const dto = OrganizationValidationService.sanitizeCreateOrganization(request.body);

      // 3. Delegar al servicio
      const organization = await this.organizationService.createOrganization(dto);

      return reply.status(201).send({
        success: true,
        data: organization,
        message: 'Organization created successfully'
      });
    } catch (error) {
      // Manejo de errores específicos
      if (error.message === 'An organization with this name already exists') {
        return reply.status(409).send({ success: false, error: error.message });
      }
      return reply.status(500).send({ success: false, error: 'Failed to create organization' });
    }
  }
}
```

## 🧪 Testing

### Testing Manual de APIs

Puedes probar las APIs usando `curl` o herramientas como Postman:

```bash
# Listar todas las organizaciones
curl -s http://localhost:3000/api/organizations | jq

# Obtener estadísticas
curl -s http://localhost:3000/api/organizations/stats | jq

# Solo organizaciones activas
curl -s http://localhost:3000/api/organizations/active | jq

# Búsqueda por nombre
curl -s "http://localhost:3000/api/organizations/search?name=Tech" | jq
```

### Tests Automatizados

```bash
# Ejecutar tests (cuando estén disponibles)
npm test

# Tests específicos por workspace
npm test --workspace=backend
npm test --workspace=frontend
```

## 🔍 Características Implementadas

### ✅ Backend Completamente Funcional
- [x] Configuración ESM con TypeScript
- [x] MikroORM con SQLite y decoradores
- [x] Entidades con UUID y timestamps automáticos
- [x] Repositorios personalizados con consultas optimizadas
- [x] **Servicios de negocio** separados de controladores
- [x] **DTOs** para tipado fuerte de requests/responses
- [x] **Validación modular** con servicios reutilizables
- [x] Controladores **refactorizados** y limpios
- [x] Rutas modularizadas con Fastify
- [x] Base de datos con datos de ejemplo
- [x] **CRUD Create completo** con validaciones

### ✅ Arquitectura Moderna y Escalable
- [x] Monorepo con npm workspaces
- [x] Separación frontend/backend
- [x] **Patrón MVC + Services** bien estructurado
- [x] **Separación de responsabilidades** clara
- [x] TypeScript con configuración ESM
- [x] Manejo de errores consistente y específico
- [x] Responses JSON estandarizadas
- [x] **Lógica de negocio** separada de HTTP
- [x] **Validaciones reutilizables** y modulares

### 🚧 Por Implementar (Próximas mejoras)
- [ ] **Endpoints PUT/DELETE** para completar CRUD
- [ ] **Validación con Zod** (reemplazar validation service manual)
- [ ] **Paginación** para endpoints GET
- [ ] **Middleware de validación** global
- [ ] Tests unitarios e integración
- [ ] Autenticación y autorización
- [ ] Middleware de logging
- [ ] Documentación Swagger/OpenAPI
- [ ] Integración frontend con backend
- [ ] Docker para producción

### 🔄 **Refactoring Realizado Hoy (24/09/2025)**
- ✅ **Separación de responsabilidades**: Controller → Service → Repository
- ✅ **DTOs implementados**: Tipado fuerte para requests
- ✅ **Servicios de validación**: Lógica reutilizable y modular
- ✅ **Controller limpio**: Solo maneja HTTP, delega lógica
- ✅ **Manejo de errores específicos**: 400, 409, 500 con mensajes claros
- ✅ **Arquitectura escalable**: Fácil añadir nuevas entidades
