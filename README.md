# Mini BBDD Test 🚀

Un proyecto de práctica que demuestra una arquitectura moderna de **fullstack** con separación clara entre frontend y backend, usando **TypeScript**, **MikroORM**, **Vite** y **Fastify**.

## 📋 Descripción

Este proyecto implementa una aplicación web completa con:
- **Frontend**: Aplicación web moderna con Vite y TypeScript
- **Backend**: API REST con Fastify, MikroORM y SQLite
- **Base de datos**: SQLite con entidades TypeScript
- **Arquitectura modular**: Organización por dominios de negocio

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
│       │   ├── organization/     # Módulo Organization
│       │   │   ├── entities/     # Entidades de base de datos
│       │   │   ├── repositories/ # Consultas personalizadas
│       │   │   ├── services/     # Lógica de negocio
│       │   │   └── dto/          # Data Transfer Objects
│       │   ├── server.ts         # Servidor principal
│       │   └── mikro-orm.config.ts
│       ├── data/          # Base de datos SQLite
│       └── package.json
├── packages/
│   └── shared/            # Tipos y utilidades compartidas
├── infra/
│   └── dev/              # Docker compose para herramientas
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

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/health` | Health check del servidor |
| `GET` | `/organizations` | Lista todas las organizaciones |
| `GET` | `/organizations/stats` | Estadísticas de organizaciones |

### Ejemplos de respuesta:

**GET /api/health**
```json
{
  "status": "ok",
  "timestamp": "2024-09-24T14:30:00.000Z",
  "database": "connected"
}
```

**GET /api/organizations/stats**
```json
{
  "data": {
    "total": 5,
    "active": 4,
    "inactive": 1
  }
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
- Separación clara: entities, repositories, services, DTOs
- Fácil escalabilidad añadiendo nuevos módulos

### Repository Pattern
```typescript
class OrganizationRepository extends EntityRepository<Organization> {
  async findActive(): Promise<Organization[]> {
    return this.find({ active: true });
  }
  
  async findByNameContaining(search: string): Promise<Organization[]> {
    return this.createQueryBuilder()
      .where('LOWER(name) LIKE LOWER(?)', [`%${search}%`])
      .getResultList();
  }
}
```

### Service Layer
Lógica de negocio separada del acceso a datos y presentación.

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén disponibles)
npm test

# Tests específicos por workspace
npm test --workspace=backend
npm test --workspace=frontend
```
