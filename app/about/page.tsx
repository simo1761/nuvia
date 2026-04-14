import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'من نحن | نوفيا كلينيك',
};

const values = [
  { icon: '🌿', title: 'طبيعي', desc: 'نؤمن بقوة المكونات الطبيعية في العناية بالبشرة بدون مواد كيماوية ضارة.' },
  { icon: '⚡', title: 'فعّال', desc: 'منتجاتنا مصممة لتحقيق نتائج ملموسة وحقيقية، لا وعود فارغة.' },
  { icon: '🛡️', title: 'آمن', desc: 'سلامة عميلاتنا أولويتنا القصوى. كل منتج يمر بفحوصات جودة صارمة.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-3xl mx-auto mb-5 shadow-gold">
            N
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            من نحن
          </h1>
          <p className="text-nuvia-light text-lg max-w-xl mx-auto">
            نوفيا كلينيك — رحلتنا نحو بشرة أكثر ثقة وإشراقاً
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mt-4" />
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl border border-accent/40 p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-secondary mb-4">قصتنا</h2>
          <div className="space-y-4 text-nuvia-text leading-relaxed text-sm sm:text-base">
            <p>
              نوفيا كلينيك وُلدت من إيمان عميق بأن كل امرأة تستحق أن تشعر بالثقة والراحة في جسدها. رأينا كيف تعاني الكثيرات من السيلوليت في صمت، وكيف يؤثر ذلك على ثقتهن بأنفسهن.
            </p>
            <p>
              بدأنا رحلتنا بالبحث عن أفضل المكونات الطبيعية والتركيبات الطبية، وتعاونا مع متخصصات في الجلدية وطب التجميل لتطوير منتجات فعّالة وآمنة في نفس الوقت.
            </p>
            <p>
              اليوم، نفخر بخدمة أكثر من 10,000 عميلة في دول الخليج العربي، وكل يوم نتلقى قصصاً ملهمة من نساء استعدن ثقتهن بأنفسهن بفضل منتجات نوفيا.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-secondary text-white rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold mb-3">رسالتنا</h2>
          <p className="text-white/85 leading-relaxed">
            مساعدة المرأة الخليجية على استعادة ثقتها بجسدها من خلال منتجات طبية طبيعية فعّالة، بأسعار في متناول الجميع، مع تقديم تجربة تسوق سهلة وآمنة.
          </p>
        </div>

        {/* Values */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-secondary text-center mb-6">قيمنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-accent/40 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-secondary mb-2">{v.title}</h3>
                <p className="text-nuvia-light text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-bold text-base shadow-gold hover:shadow-gold-lg transition-all"
          >
            تسوقي معنا الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
