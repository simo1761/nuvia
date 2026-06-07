import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { orderRoutes } from './routes/orders';
import { adminRoutes } from './routes/admin';

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
  trustProxy: true, // needed to get real IP behind Easypanel reverse proxy
});

// CORS
app.register(cors, {
  origin: process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, 'http://localhost:3000']
    : true,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  credentials: true,
});

// JWT
app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'nuvia-dev-secret-change-in-production',
});

// Routes
app.register(orderRoutes, { prefix: '/api' });
app.register(adminRoutes, { prefix: '/api/admin' });

// Health check
app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV ?? 'development',
}));

// Start
const start = async () => {
  const port = parseInt(process.env.PORT ?? '3001');
  const host = '0.0.0.0';

  try {
    await app.listen({ port, host });
    console.log(`🚀 Nuvia backend running on http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
