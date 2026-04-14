import Image from 'next/image';
import StarRating from '@/components/shared/StarRating';

const photoReviews = [
  {
    photo: '/images/reviews/review1.jpg',
    name: 'سارة العتيبي',
    city: 'الرياض',
    rating: 5,
    text: 'منتج رائع جداً! استخدمته لمدة شهر ولاحظت فرقاً واضحاً في مظهر السيلوليت على فخذي. الزيت له رائحة جميلة ويمتص بسرعة دون أي دهون. أنصح به بشدة!',
    date: '١٥ نوفمبر ٢٠٢٤',
  },
  {
    photo: '/images/reviews/review2.jpg',
    name: 'نورة الشمري',
    city: 'الكويت',
    rating: 5,
    text: 'الكيت وصل بشكل أنيق وبدأت نفس اليوم. بعد ٣ أسابيع لاحظت فرقاً ملحوظاً في منطقة الأرداف. الجهاز سهل الاستخدام ورائحة الزيت منعشة جداً!',
    date: '٢ ديسمبر ٢٠٢٤',
  },
  {
    photo: '/images/reviews/review3.jpg',
    name: 'فاطمة الزهراني',
    city: 'جدة',
    rating: 5,
    text: 'أفضل استثمار قمت به لنفسي! البشرة أصبحت أكثر نعومة وتماسكاً بشكل واضح. لاحظت الفرق بعد أسبوعين فقط من الاستخدام اليومي.',
    date: '٨ ديسمبر ٢٠٢٤',
  },
  {
    photo: '/images/reviews/review4.jpg',
    name: 'هند القحطاني',
    city: 'الدمام',
    rating: 5,
    text: 'جربت منتجات كثيرة من قبل ولم تنجح. هذا الكيت هو الوحيد الذي أعطاني نتائج حقيقية ومرئية. شكراً نوفيا من القلب!',
    date: '١٩ ديسمبر ٢٠٢٤',
  },
  {
    photo: '/images/reviews/review5.jpg',
    name: 'ريم الحربي',
    city: 'أبوظبي',
    rating: 5,
    text: 'ما توقعت النتائج تكون بهالسرعة! بعد شهر بشرتي تغيرت كلياً. الجهاز يعطي إحساس دافئ ممتع والزيت يدخل للجلد فوراً.',
    date: '٢٦ ديسمبر ٢٠٢٤',
  },
  {
    photo: '/images/reviews/review6.jpg',
    name: 'منى الدوسري',
    city: 'البحرين',
    rating: 4.5,
    text: 'منتج ممتاز! كنت متشككة في البداية لكن النتائج أثبتت العكس. التغليف فاخر والكيت يشمل كل ما تحتاجينه. سأطلب كيت ثاني قريباً.',
    date: '٣ يناير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review7.jpg',
    name: 'لينا المطيري',
    city: 'الرياض',
    rating: 5,
    text: 'بعد ٤ أسابيع من الاستخدام المنتظم، السيلوليت تقلص بشكل واضح جداً. الزيت رائحته رائعة والجهاز يعمل بكفاءة عالية. ١٠٠٪ أنصح به.',
    date: '١٠ يناير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review8.jpg',
    name: 'عبير السعد',
    city: 'الكويت',
    rating: 5,
    text: 'زيت الزنجبيل رهيب! الدفء اللي يحس فيه على الجلد يدل إنه يشتغل. استخدمته ٣ أسابيع وشفت فرق واضح جداً في الأفخاذ.',
    date: '١٧ يناير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review9.jpg',
    name: 'شيماء البلوشي',
    city: 'مسقط',
    rating: 5,
    text: 'استلمت الطلب خلال يومين وبدأت نفس اليوم. النتائج تدريجية لكن ملحوظة جداً من الأسبوع الثاني. جهاز التدليك مريح جداً للاستخدام.',
    date: '٢٤ يناير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review10.jpg',
    name: 'أميرة التميمي',
    city: 'الرياض',
    rating: 5,
    text: 'انصدمت من النتائج بصراحة! ما كنت أتوقع الفرق يكون بهالوضوح. الجهاز مريح في اليد والزيت ينتشر على البشرة بسهولة.',
    date: '١ فبراير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review11.jpg',
    name: 'دينا العجمي',
    city: 'الكويت',
    rating: 5,
    text: 'اشتريته لنفسي واشتريته لأختي بعدها مباشرة! منتج استثنائي. أختي كمان شافت نتائج رائعة. يستاهل كل ريال.',
    date: '٧ فبراير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review12.jpg',
    name: 'سلمى الغامدي',
    city: 'مكة المكرمة',
    rating: 4.5,
    text: 'منتج ممتاز ويحتاج صبر واستمرار. بعد شهر ونص شفت فرق كبير والحمد لله. البشرة أصبحت أكثر نضارة ونعومة بشكل ملحوظ.',
    date: '١٤ فبراير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review13.jpg',
    name: 'رنا المنصور',
    city: 'دبي',
    rating: 5,
    text: 'أفضل هدية قدمتها لنفسي في ٢٠٢٥! الجهاز يعمل بشكل مذهل والزيت رائحته فاخرة جداً. النتائج تكلم نفسها بعد أسبوعين.',
    date: '٢١ فبراير ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review14.jpg',
    name: 'حنان الرشيد',
    city: 'الطائف',
    rating: 5,
    text: 'جربته بعد توصيات البنات وما ندمت أبداً. النتائج واضحة من الأسبوع الثالث. التغليف جميل ومناسب للهدايا أيضاً.',
    date: '١ مارس ٢٠٢٥',
  },
  {
    photo: '/images/reviews/review15.jpg',
    name: 'وفاء الكندري',
    city: 'الكويت',
    rating: 5,
    text: 'أنا على الأسبوع السادس والفرق واضح جداً في الفخذين والبطن. استمرت معي النتائج وتتحسن أسبوع بعد أسبوع. شكراً نوفيا!',
    date: '١٠ مارس ٢٠٢٥',
  },
];

export default function ProductPhotoReviews() {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-sm font-bold text-secondary">📸 تجارب عميلاتنا بالصور</p>
        <span className="text-xs text-nuvia-light">{photoReviews.length} تقييم بصورة</span>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto pb-3 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photoReviews.map((r, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 sm:w-64 bg-white rounded-2xl border border-accent/40 shadow-sm overflow-hidden snap-start"
          >
            {/* Square photo */}
            <div className="relative w-full aspect-square">
              <Image
                src={r.photo}
                alt={`تقييم ${r.name}`}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>

            {/* Card body */}
            <div className="p-3">
              {/* Stars + name row */}
              <div className="flex items-start justify-between gap-1 mb-1">
                <StarRating rating={r.rating} size="sm" />
                <div className="text-left min-w-0">
                  <p className="font-bold text-secondary text-xs leading-tight truncate">{r.name}</p>
                  <p className="text-nuvia-light text-[11px] leading-tight">{r.city}</p>
                </div>
              </div>

              {/* Review text */}
              <p className="text-nuvia-text text-xs leading-relaxed line-clamp-4 mb-2">
                {r.text}
              </p>

              {/* Date */}
              <p className="text-nuvia-light text-[11px]">{r.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
