export default function NotAvailablePage() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 font-tajawal" dir="rtl">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-6">🌍</div>
        <h1 className="text-2xl font-bold text-white mb-3">
          المنتج غير متوفر في منطقتك
        </h1>
        <p className="text-white/65 text-base leading-relaxed">
          باقة RF من نوفيا متاحة حالياً للمملكة العربية السعودية فقط.
          <br />
          نعمل على التوسع — ترقّبي!
        </p>
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 text-white/50 text-xs px-4 py-2 rounded-full">
          🇸🇦 Saudi Arabia only
        </div>
      </div>
    </div>
  );
}
