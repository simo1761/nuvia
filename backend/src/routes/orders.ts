import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import { sendCapiPurchaseEvent } from '../services/metaCapi';

export async function orderRoutes(fastify: FastifyInstance) {
  // POST /api/orders — create order from checkout form
  fastify.post<{
    Body: {
      fullName: string;
      phone: string;
      city: string;
      address?: string;
      notes?: string;
      productSlug: string;
      productName: string;
      quantity?: number;
      price: number;
      fbclid?: string;
      fbp?: string;
      fbc?: string;
      userAgent?: string;
      ipAddress?: string;
      eventId?: string;
    };
  }>('/orders', async (request, reply) => {
    const {
      fullName, phone, city, address, notes,
      productSlug, productName, quantity, price,
      fbclid, fbp, fbc, userAgent, ipAddress, eventId,
    } = request.body;

    if (!fullName || !phone || !city || !productSlug || !productName || price == null) {
      return reply.status(400).send({ error: 'Missing required fields' });
    }

    const order = await prisma.order.create({
      data: {
        fullName,
        phone,
        city,
        address: address ?? null,
        notes: notes ?? null,
        productSlug,
        productName,
        quantity: quantity ?? 1,
        price,
        fbclid: fbclid ?? null,
        fbp: fbp ?? null,
        fbc: fbc ?? null,
        userAgent: userAgent ?? (request.headers['user-agent'] ?? null),
        ipAddress: ipAddress ?? (request.ip ?? null),
        eventId: eventId ?? null,
      },
    });

    // Fire CAPI asynchronously — do not block the response
    const capiEventId = eventId ?? order.id;
    sendCapiPurchaseEvent({
      phone,
      ipAddress: order.ipAddress ?? request.ip ?? '',
      userAgent: order.userAgent ?? request.headers['user-agent'] ?? '',
      fbp: fbp ?? null,
      fbc: fbc ?? fbclid ?? null,
      eventId: capiEventId,
      value: price,
      contentName: productName,
      contentId: productSlug,
      eventSourceUrl: `${process.env.FRONTEND_URL ?? 'https://nuviabody.shop'}/product/${productSlug}`,
    })
      .then(() => {
        return prisma.order.update({
          where: { id: order.id },
          data: { capiSent: true, capiSentAt: new Date() },
        });
      })
      .catch((err: unknown) => {
        fastify.log.error({ err }, '[CAPI] Failed to send purchase event');
      });

    return reply.status(201).send({ success: true, orderId: order.id });
  });
}
