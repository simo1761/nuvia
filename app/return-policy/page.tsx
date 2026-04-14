import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الإرجاع والاستبدال | نوفيا كلينيك',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            سياسة الإرجاع والاستبدال
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mt-3" />
        </div>

        <div className="bg-white rounded-2xl border border-accent/40 shadow-sm p-6 sm:p-8 space-y-8 text-nuvia-text leading-relaxed">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="font-bold text-primary text-lg">ضمان الرضا الكامل لمدة 14 يوماً 🛡️</p>
            <p className="text-sm text-nuvia-light mt-1">
              إذا لم تكوني راضية، سنحل المشكلة بدون تعقيدات
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3">شروط الإرجاع</h2>
            <ul className="space-y-2 text-sm">
              {[
                'يجب الإبلاغ عن طلب الإرجاع خلال 14 يوماً من تاريخ الاستلام',
                'يجب أن يكون المنتج غير مستخدم وفي حالته الأصلية',
                'يجب أن يكون المنتج في عبوته الأصلية المغلقة',
                'يُستثنى من الإرجاع المنتجات المفتوحة لأسباب صحية وسلامة',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3">حالات قبول الإرجاع</h2>
            <ul className="space-y-2 text-sm">
              {[
                'المنتج تالف أو معيب عند الاستلام',
                'استلام منتج مختلف عن الطلب',
                'حساسية جلدية مثبتة من الطبيب',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-nuvia-success mt-0.5 flex-shrink-0">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3">إجراءات الإرجاع</h2>
            <ol className="space-y-3 text-sm">
              {[
                'تواصلي معنا عبر الواتساب أو البريد الإلكتروني',
                'أرسلي صوراً للمنتج ورقم الطلب',
                'سيقوم فريقنا بمراجعة الطلب خلال 24 ساعة',
                'ترتيب الاستلام أو الاستبدال حسب الاتفاق',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-3">استرداد المبلغ</h2>
            <p className="text-sm">
              في حالة قبول طلب الإرجاع، يتم استرداد المبلغ بالطريقة التي تفضلينها. نحن ملتزمون بحل أي مشكلة بطريقة عادلة وسريعة.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
