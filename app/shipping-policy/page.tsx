import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الشحن والتوصيل | نوفيا كلينيك',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            سياسة الشحن والتوصيل
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mt-3" />
        </div>

        <div className="bg-white rounded-2xl border border-accent/40 shadow-sm p-6 sm:p-8 space-y-8 text-nuvia-text leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              🌍 مناطق الشحن
            </h2>
            <p className="mb-2">نقوم بالشحن إلى جميع دول مجلس التعاون الخليجي:</p>
            <ul className="list-none space-y-1.5 text-sm">
              <li className="flex items-center gap-2">🇸🇦 المملكة العربية السعودية — جميع المناطق</li>
              <li className="flex items-center gap-2">🇰🇼 الكويت</li>
              <li className="flex items-center gap-2">🇦🇪 الإمارات العربية المتحدة</li>
              <li className="flex items-center gap-2">🇧🇭 مملكة البحرين</li>
              <li className="flex items-center gap-2">🇴🇲 سلطنة عُمان</li>
              <li className="flex items-center gap-2">🇶🇦 دولة قطر</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              ⏱️ مدة التوصيل
            </h2>
            <div className="bg-bg-alt rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">المملكة العربية السعودية</span>
                <span className="text-primary font-bold">2-5 أيام عمل</span>
              </div>
              <div className="flex justify-between border-t border-accent/40 pt-2">
                <span className="font-medium">باقي دول الخليج</span>
                <span className="text-primary font-bold">3-7 أيام عمل</span>
              </div>
            </div>
            <p className="text-sm text-nuvia-light mt-2">
              * قد تتأخر الشحنات خلال أيام العطل الرسمية والمناسبات الوطنية.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              💰 تكلفة الشحن
            </h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="font-bold text-primary text-lg text-center">
                🎁 الشحن مجاني لجميع الطلبات
              </p>
              <p className="text-sm text-nuvia-light text-center mt-1">
                بدون حد أدنى للطلب
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              📦 تتبع الشحنة
            </h2>
            <p className="text-sm">
              بعد تأكيد طلبك، ستصلك رسالة نصية برقم التتبع خلال 24-48 ساعة من وقت الشحن. يمكنك استخدام هذا الرقم لتتبع شحنتك مباشرة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              💵 الدفع عند الاستلام (COD)
            </h2>
            <p className="text-sm">
              نقبل الدفع نقداً عند استلام الطلب فقط. يرجى التأكد من توفر المبلغ عند وصول المندوب.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
              📞 تواصل معنا
            </h2>
            <p className="text-sm">
              لأي استفسار حول طلبك أو شحنتك، تواصلي معنا عبر:
            </p>
            <ul className="text-sm mt-2 space-y-1">
              <li>📱 واتساب: +966 XX XXX XXXX</li>
              <li>📧 البريد: support@nuviabody.shop</li>
              <li>🕐 ساعات العمل: الأحد - الخميس، 9 صباحاً - 6 مساءً</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
