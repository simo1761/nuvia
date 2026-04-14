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

  if (!credentialsJson || !sheetId) {
    throw new Error('Missing Google Sheets configuration');
  }

  const credentials = JSON.parse(credentialsJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Date format: DD/MM/YYYY HH:MM
  const now = new Date();
  const orderDate = [
    String(now.getDate()).padStart(2, '0'),
    String(now.getMonth() + 1).padStart(2, '0'),
    now.getFullYear(),
  ].join('/') + ' ' + [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ].join(':');

  // COD Network column order — exact:
  // OrderDate | country | name | phone | address | url | sku | Product | quantity | price | currency | notes | utm | national_address
  const row = [
    orderDate,       // OrderDate   — auto
    order.country,   // country     — from form
    order.name,      // name        — from form
    order.phone,     // phone       — from form
    order.city,      // address     — city from form
    '',              // url         — empty
    order.sku,       // sku         — from product
    '',              // Product     — empty
    1,               // quantity    — always 1
    order.price,     // price       — from product
    order.currency,  // currency    — SAR
    '',              // notes       — empty
    '',              // utm         — empty
    '',              // national_address — empty
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:N',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });
}
