import * as crypto from 'crypto';

export interface CAPIOptions {
  phone: string;
  ipAddress: string;
  userAgent: string;
  fbp: string | null;
  fbc: string | null;
  eventId: string;
  value: number;
  contentName: string;
  contentId: string;
  eventSourceUrl: string;
}

function sha256(str: string): string {
  return crypto.createHash('sha256').update(str.toLowerCase().trim()).digest('hex');
}

export async function sendCapiPurchaseEvent(opts: CAPIOptions): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.log('[CAPI] META_PIXEL_ID or META_ACCESS_TOKEN not set — skipping');
    return;
  }

  // Normalize phone: strip formatting, keep + prefix
  const normalizedPhone = opts.phone.replace(/[\s\-\(\)\.]/g, '');

  const userData: Record<string, unknown> = {
    ph: [sha256(normalizedPhone)],
    client_ip_address: opts.ipAddress,
    client_user_agent: opts.userAgent,
  };
  if (opts.fbp) userData.fbp = opts.fbp;
  if (opts.fbc) userData.fbc = opts.fbc;

  const event = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: opts.eventId,
    action_source: 'website',
    event_source_url: opts.eventSourceUrl,
    user_data: userData,
    custom_data: {
      currency: 'SAR',
      value: opts.value,
      content_name: opts.contentName,
      content_ids: [opts.contentId],
      content_type: 'product',
      num_items: 1,
    },
  };

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json() as Record<string, unknown>;

  if (!res.ok) {
    throw new Error(`[CAPI] HTTP ${res.status}: ${JSON.stringify(data)}`);
  }

  console.log('[CAPI] Purchase event sent — events_received:', data.events_received);
}
