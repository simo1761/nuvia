import { createHash } from 'crypto';

const PIXEL_ID       = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';
const CAPI_TOKEN     = process.env.META_CAPI_TOKEN ?? '';
const TEST_CODE      = process.env.META_TEST_EVENT_CODE ?? '';
const GRAPH_API      = 'https://graph.facebook.com/v20.0';
const SITE_URL       = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nuviabody.shop';

export function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Normalize phone to digits only (no + no spaces) before hashing
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

interface UserData {
  phone?: string;           // raw E.164 phone (e.g. +966596840599) — we hash it
  firstName?: string;       // first word of name
  city?: string;
  countryCode?: string;     // 'SA' | 'KW' | 'AE' ...
  externalId?: string;      // we reuse hashed phone
  clientIp?: string;
  clientUa?: string;
  fbp?: string;
  fbc?: string;
}

interface CustomData {
  value: number;
  currency: string;
  contentIds: string[];
  orderId?: string;
}

interface CapiEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url: string;
  action_source: 'website';
  user_data: Record<string, string>;
  custom_data?: Record<string, unknown>;
}

function buildUserData(u: UserData): Record<string, string> {
  const d: Record<string, string> = {};

  if (u.phone) {
    const p = normalizePhone(u.phone);
    d.ph          = sha256(p);
    d.external_id = sha256(p);
  }
  if (u.firstName) d.fn      = sha256(u.firstName);
  if (u.city)      d.ct      = sha256(u.city);
  if (u.countryCode) d.country = sha256(u.countryCode.toLowerCase());

  // Not hashed
  if (u.clientIp) d.client_ip_address  = u.clientIp;
  if (u.clientUa) d.client_user_agent  = u.clientUa;
  if (u.fbp)      d.fbp                = u.fbp;
  if (u.fbc)      d.fbc                = u.fbc;

  return d;
}

export async function sendPurchaseCapi(params: {
  eventId: string;
  user: UserData;
  custom: CustomData;
}): Promise<void> {
  if (!PIXEL_ID || !CAPI_TOKEN) {
    console.warn('[CAPI] META_CAPI_TOKEN or NEXT_PUBLIC_META_PIXEL_ID not set — skipping.');
    return;
  }

  const event: CapiEvent = {
    event_name:       'Purchase',
    event_time:       Math.floor(Date.now() / 1000),
    event_id:         params.eventId,
    event_source_url: SITE_URL,
    action_source:    'website',
    user_data:        buildUserData(params.user),
    custom_data: {
      value:        params.custom.value,
      currency:     params.custom.currency,
      content_ids:  params.custom.contentIds,
      content_type: 'product',
      order_id:     params.custom.orderId,
      contents:     params.custom.contentIds.map(id => ({
        id,
        quantity: 1,
        delivery_category: 'home_delivery',
      })),
    },
  };

  const body: Record<string, unknown> = { data: [event], access_token: CAPI_TOKEN };
  if (TEST_CODE) body.test_event_code = TEST_CODE;

  try {
    const res = await fetch(`${GRAPH_API}/${PIXEL_ID}/events`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const text = await res.text();
    if (res.ok) {
      console.log('[CAPI] Purchase sent — event_id:', params.eventId);
    } else {
      console.error('[CAPI] Failed:', res.status, text);
    }
  } catch (err) {
    console.error('[CAPI] Network error:', err);
  }
}
