import { notFound } from 'next/navigation';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Order } from '@/app/api/order/route';

export const dynamic = 'force-dynamic';

const ORDERS_FILE =
  process.env.ORDERS_FILE ??
  (process.platform === 'win32'
    ? join(process.cwd(), 'orders.json')
    : '/tmp/nuvia-orders.json');
const ADMIN_KEY   = process.env.ADMIN_KEY ?? 'nuvia2025';

const COUNTRY_LABELS: Record<string, string> = {
  SA: '🇸🇦 السعودية',
  KW: '🇰🇼 الكويت',
  AE: '🇦🇪 الإمارات',
  BH: '🇧🇭 البحرين',
  OM: '🇴🇲 عُمان',
  QA: '🇶🇦 قطر',
};

const STATUS_COLORS: Record<Order['status'], string> = {
  new:       'bg-blue-100 text-blue-700',
  confirmed: 'bg-yellow-100 text-yellow-700',
  shipped:   'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

const STATUS_LABELS: Record<Order['status'], string> = {
  new:       'جديد',
  confirmed: 'مؤكد',
  shipped:   'مُشحون',
  delivered: 'مُسلَّم',
  cancelled: 'ملغي',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ar-SA', {
    timeZone: 'Asia/Riyadh',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

interface Props {
  searchParams: { key?: string };
}

export default function AdminOrdersPage({ searchParams }: Props) {
  if (searchParams.key !== ADMIN_KEY) notFound();

  let orders: Order[] = [];
  try {
    if (existsSync(ORDERS_FILE)) {
      orders = JSON.parse(readFileSync(ORDERS_FILE, 'utf8')) as Order[];
    }
  } catch { orders = []; }

  orders = [...orders].reverse();

  const total    = orders.length;
  const revenue  = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.price, 0);
  const newCount = orders.filter(o => o.status === 'new').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة الطلبات — نوفيا</h1>
            <p className="text-gray-500 text-sm mt-0.5">الطلبات المحفوظة محلياً</p>
          </div>
          <span className="text-xs text-gray-400 bg-white border rounded-lg px-3 py-1.5">🔒 وصول خاص</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'إجمالي الطلبات', value: String(total), color: 'text-gray-900' },
            { label: 'طلبات جديدة',    value: String(newCount), color: 'text-blue-600' },
            { label: 'الإيرادات',       value: `${revenue.toLocaleString('en')} SAR`, color: 'text-green-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center text-gray-400">
            لا توجد طلبات بعد
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['رقم الطلب','التاريخ','الاسم','الهاتف','المدينة','الدولة','المنتج','السعر','الحالة','COD'].map(h => (
                      <th key={h} className="text-right px-4 py-3 text-gray-600 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{o.id}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{formatDate(o.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{o.name}</td>
                      <td className="px-4 py-3 font-mono text-gray-700 whitespace-nowrap" dir="ltr">{o.phone}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{o.city}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{COUNTRY_LABELS[o.country] ?? o.country}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{o.product}</td>
                      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{o.price} {o.currency}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[o.status]}`}>
                          {STATUS_LABELS[o.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {o.sentToCod
                          ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">✓ أرسل</span>
                          : o.codNote === 'returning_customer'
                            ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">عميلة متكررة</span>
                            : o.codNote === 'cod_error'
                              ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">خطأ</span>
                              : <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">معلق</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-center text-gray-300 text-xs mt-6">Nuvia Admin · {ORDERS_FILE}</p>
      </div>
    </div>
  );
}
