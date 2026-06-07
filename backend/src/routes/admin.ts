import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prisma';

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'DELIVERED' | 'RETURNED';
const VALID_STATUSES: OrderStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'DELIVERED', 'RETURNED'];

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}

export async function adminRoutes(fastify: FastifyInstance) {
  // POST /api/admin/login
  fastify.post<{ Body: { username: string; password: string } }>(
    '/login',
    async (request, reply) => {
      const { username, password } = request.body;

      if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
      ) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      const token = fastify.jwt.sign(
        { username, role: 'admin' },
        { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' }
      );

      return { token };
    }
  );

  // GET /api/admin/orders
  fastify.get<{
    Querystring: { status?: string; page?: string; limit?: string; search?: string };
  }>('/orders', { preHandler: [authenticate] }, async (request, reply) => {
    const { status, page = '1', limit = '20', search } = request.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};
    if (status && VALID_STATUSES.includes(status as OrderStatus)) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };
  });

  // PATCH /api/admin/orders/:id/status
  fastify.patch<{
    Params: { id: string };
    Body: { status: string };
  }>('/orders/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params;
    const { status } = request.body;

    if (!VALID_STATUSES.includes(status as OrderStatus)) {
      return reply.status(400).send({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    try {
      const order = await prisma.order.update({
        where: { id },
        data: { status: status as OrderStatus },
      });
      return order;
    } catch {
      return reply.status(404).send({ error: 'Order not found' });
    }
  });

  // GET /api/admin/stats
  fastify.get('/stats', { preHandler: [authenticate] }, async () => {
    const [total, pending, confirmed, delivered, cancelled, returned, revenueAgg] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.order.count({ where: { status: 'CONFIRMED' } }),
        prisma.order.count({ where: { status: 'DELIVERED' } }),
        prisma.order.count({ where: { status: 'CANCELLED' } }),
        prisma.order.count({ where: { status: 'RETURNED' } }),
        prisma.order.aggregate({
          where: { status: { in: ['CONFIRMED', 'DELIVERED'] } },
          _sum: { price: true },
        }),
      ]);

    return {
      totalOrders: total,
      pendingOrders: pending,
      confirmedOrders: confirmed,
      deliveredOrders: delivered,
      cancelledOrders: cancelled,
      returnedOrders: returned,
      revenue: revenueAgg._sum.price ?? 0,
      conversionRate:
        total > 0
          ? Number(((confirmed + delivered) / total) * 100).toFixed(1)
          : '0',
    };
  });
}
