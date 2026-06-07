'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  revenue: number;
  conversionRate: string;
}

interface StatCard {
  label: string;
  value: string | number;
  color: string;
  bg: string;
}

export default function AdminStats() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('nuvia_admin_token');
    if (!token) { router.replace('/admin/login'); return; }

    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.status === 401) { router.replace('/admin/login'); return null; }
        return res.json() as Promise<Stats>;
      })
      .then(data => { if (data) setStats(data); })
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => { localStorage.removeItem('nuvia_admin_token'); router.replace('/admin/login'); };

  const cards: StatCard[] = stats ? [
    { label: 'Total Orders',     value: stats.totalOrders,     color: 'text-gray-900',   bg: 'bg-white' },
    { label: 'Pending',          value: stats.pendingOrders,   color: 'text-yellow-700', bg: 'bg-yellow-50' },
    { label: 'Confirmed',        value: stats.confirmedOrders, color: 'text-blue-700',   bg: 'bg-blue-50' },
    { label: 'Delivered',        value: stats.deliveredOrders, color: 'text-green-700',  bg: 'bg-green-50' },
    { label: 'Cancelled',        value: stats.cancelledOrders, color: 'text-red-700',    bg: 'bg-red-50' },
    { label: 'Returned',         value: stats.returnedOrders,  color: 'text-gray-600',   bg: 'bg-gray-50' },
    { label: 'Revenue (SAR)',    value: `${stats.revenue.toLocaleString()} SAR`, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Conversion Rate',  value: `${stats.conversionRate}%`, color: 'text-purple-700', bg: 'bg-purple-50' },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-amber-600 text-lg">Nuvia Admin</span>
          <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-900">Orders</Link>
          <Link href="/admin/stats" className="text-sm font-medium text-gray-900">Stats</Link>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Logout</button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-6">Statistics</h1>

        {loading && <p className="text-gray-400 text-center py-20">Loading...</p>}
        {error && <p className="text-red-500 text-center py-20">{error}</p>}

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map(card => (
              <div key={card.label} className={`${card.bg} border border-gray-200 rounded-xl p-5`}>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{card.label}</p>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {stats && (
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Order Funnel</h2>
            <div className="space-y-3">
              {[
                { label: 'Total received',   value: stats.totalOrders,     max: stats.totalOrders, color: 'bg-gray-400' },
                { label: 'Confirmed',        value: stats.confirmedOrders, max: stats.totalOrders, color: 'bg-blue-500' },
                { label: 'Delivered',        value: stats.deliveredOrders, max: stats.totalOrders, color: 'bg-green-500' },
                { label: 'Cancelled',        value: stats.cancelledOrders, max: stats.totalOrders, color: 'bg-red-400' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-28 text-sm text-gray-600 shrink-0">{row.label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: row.max > 0 ? `${(row.value / row.max) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="w-8 text-sm font-semibold text-gray-700 text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
