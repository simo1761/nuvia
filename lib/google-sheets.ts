import { google } from 'googleapis';

export interface OrderData {
  name: string;
  phone: string;
  city: string;
  country: string;
  sku: string;
  price: number;
  currency: string;
}

export async function appendOrderToSheet(order: OrderData): Promise<void> {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  console.log('[SHEETS] GOOGLE_SHEET_ID present:', !!sheetId);
  console.log('[SHEETS] GOOGLE_SHEETS_CREDENTIALS present:', !!credentialsJson);

  if (!credentialsJson || !sheetId) {
    throw new Error('Missing Google Sheets configuration');
  }

  let clientEmail: string;
  let privateKey: string;

  try {
    const raw = JSON.parse(credentialsJson);

    clientEmail = raw.client_email;

    // Robust key fix for Vercel (Node 18 + OpenSSL 3):
    // 1. split on the literal two-char sequence \n and rejoin with real newlines
    // 2. trim() removes any stray whitespace/CR around the PEM block
    privateKey = (raw.private_key as string)
      .split(String.raw`\n`)
      .join('\n')
      .trim();

    console.log('[SHEETS] client_email:', clientEmail);
    console.log('[SHEETS] private_key starts with:', privateKey.slice(0, 40));
  } catch (e) {
    throw new Error(
      'Failed to parse GOOGLE_SHEETS_CREDENTIALS: ' +
      (e instanceof Error ? e.message : String(e))
    );
  }

  // Use JWT directly — more reliable than GoogleAuth on Vercel / Node 18
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Date format: DD/MM/YYYY HH:MM
  const now = new Date();
  const orderDate =
    [
      String(now.getDate()).padStart(2, '0'),
      String(now.getMonth() + 1).padStart(2, '0'),
      now.getFullYear(),
    ].join('/') +
    ' ' +
    [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
    ].join(':');

  // COD Network column order — exact (14 columns):
  // OrderDate | country | name | phone | address | url | sku | Product | quantity | price | currency | notes | utm | national_address
  const row = [
    orderDate,      // OrderDate        — auto
    order.country,  // country          — from form
    order.name,     // name             — from form
    order.phone,    // phone            — from form
    order.city,     // address          — city from form
    '',             // url              — empty
    order.sku,      // sku              — from product
    '',             // Product          — empty
    1,              // quantity         — always 1
    order.price,    // price            — from product
    order.currency, // currency         — SAR
    '',             // notes            — empty
    '',             // utm              — empty
    '',             // national_address — empty
  ];

  console.log('[SHEETS] Row to append:', row);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:N',
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });
    console.log('[SHEETS] Append successful');
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const details = (e as any)?.response?.data ?? '';
    console.error('[SHEETS] Append failed:', msg);
    if (details) console.error('[SHEETS] API response:', JSON.stringify(details));
    throw e;
  }
}
