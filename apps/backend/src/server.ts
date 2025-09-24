import 'reflect-metadata';
import Fastify from 'fastify';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js';

const fastify = Fastify({ logger: true });

// Global ORM instance
let orm: MikroORM;

// Initialize database connection
async function initDatabase() {
  console.log('🚀 Initializing database connection...');
  orm = await MikroORM.init(config);
  
  // Update schema if needed
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  
  console.log('✅ Database connected and schema updated');
}

// Health check endpoint
fastify.get('/api/health', async () => {
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: await orm.isConnected() ? 'connected' : 'disconnected'
  };
});

// Organizations endpoints
fastify.get('/api/organizations', async () => {
  const em = orm.em.fork();
  const organizations = await em.find('Organization', {});
  return { data: organizations };
});

fastify.get('/api/organizations/stats', async () => {
  const em = orm.em.fork();
  const total = await em.count('Organization', {});
  const active = await em.count('Organization', { active: true });
  const inactive = total - active;
  
  return { 
    data: { 
      total, 
      active, 
      inactive 
    } 
  };
});

// CORS for frontend
fastify.register(import('@fastify/cors'), {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
});

// Start server
async function start() {
  try {
    await initDatabase();
    
    const address = await fastify.listen({ 
      port: 3000, 
      host: '0.0.0.0' 
    });
    
    console.log(`🚀 Backend server running at ${address}`);
    console.log(`📊 API endpoints available at ${address}/api/`);
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔌 Shutting down gracefully...');
  if (orm) await orm.close();
  process.exit(0);
});

start();