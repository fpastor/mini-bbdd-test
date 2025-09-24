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
│       │   ├── organization/     # Módulo Organization (MVC)
│       │   │   ├── entities/     # Entidades TypeScript + decoradores
│       │   │   │   └── organization.entity.ts
│       │   │   ├── repositories/ # Consultas personalizadas
│       │   │   │   └── organization.repository.ts
│       │   │   ├── controllers/  # Controladores HTTP
│       │   │   │   └── organization.controller.ts
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

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/organizations` | Lista todas las organizaciones | - |
| `GET` | `/organizations/stats` | Estadísticas de organizaciones | - |
| `GET` | `/organizations/active` | Solo organizaciones activas | - |
| `GET` | `/organizations/search` | Búsqueda por nombre | `?name=texto` |

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

### Patrón Controller
```typescript
export class OrganizationController {
  constructor(private organizationRepository: OrganizationRepository) {}

  async getAll(): Promise<{ data: Organization[]; count: number }> {
    const organizations = await this.organizationRepository.findAll();
    return { data: organizations, count: organizations.length };
  }

  async search(name: string): Promise<{ data: Organization[]; count: number }> {
    const organizations = await this.organizationRepository.findByNameContaining(name);
    return { data: organizations, count: organizations.length };
  }
}
```

### Configuración de Rutas (Fastify)
```typescript
const organizationRoutes: FastifyPluginAsync = async (fastify) => {
  const controller = new OrganizationController(organizationRepository);

  fastify.get('/organizations', async (request, reply) => {
    try {
      const result = await controller.getAll();
      return reply.send(result);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
};
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
- [x] Controladores con manejo de errores
- [x] Rutas modularizadas con Fastify
- [x] Base de datos con datos de ejemplo
- [x] APIs RESTful completamente funcionales

### ✅ Arquitectura Moderna
- [x] Monorepo con npm workspaces
- [x] Separación frontend/backend
- [x] Patrón MVC bien estructurado
- [x] TypeScript con configuración ESM
- [x] Manejo de errores consistente
- [x] Responses JSON estandarizadas

### 🚧 Por Implementar
- [ ] Endpoints POST/PUT/DELETE
- [ ] Validación de schemas con Zod/Joi
- [ ] Autenticación y autorización
- [ ] Middleware de logging
- [ ] Tests unitarios e integración
- [ ] Documentación Swagger/OpenAPI
- [ ] Integración frontend con backend
- [ ] Docker para producción
