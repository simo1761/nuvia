const badges = [
  { icon: '🚚', title: 'شحن مجاني', desc: 'لجميع أنحاء دول الخليج' },
  { icon: '💵', title: 'الدفع عند الاستلام', desc: 'ادفعي عند وصول طلبك' },
  { icon: '✅', title: 'منتجات طبية معتمدة', desc: 'مكونات طبيعية 100%' },
  { icon: '🔄', title: 'ضمان الاسترجاع', desc: 'خلال 14 يوماً' },
];

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-accent/40 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-right p-3"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-bg-alt rounded-full flex items-center justify-center text-2xl">
                {badge.icon}
              </div>
              <div>
                <p className="font-bold text-secondary text-sm">{badge.title}</p>
                <p className="text-nuvia-light text-xs mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
