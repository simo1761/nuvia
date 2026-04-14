import { google } from 'googleapis';

export interface OrderData {
  name: string;
  phone: string;
  city: string;
  country: string;
  sku: string;
  product: string;
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

  const orderDate = new Date().toISOString();

  // COD Network format:
  // OrderDate | country | name | phone | address | url | sku | Product | quantity | price | currency
  const row = [
    orderDate,
    order.country,
    order.name,
    order.phone,
    order.city,
    '',
    order.sku,
    order.product,
    1,
    order.price,
    order.currency,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:K',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });
}
