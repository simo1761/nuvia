export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  benefits: string[];
  howToUse: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'anti-cellulite-kit',
    sku: 'MP-MCMXJX1KL7OW',
    name: 'باقة نوفيا المضادة للسيلوليت',
    nameEn: 'Nuvia Anti-Cellulite Kit',
    tagline: 'جهاز تدليك + زيت الزنجبيل الطبيعي — الحل الأمثل للسيلوليت العنيد',
    description:
      'باقة نوفيا الشاملة لمكافحة السيلوليت: جهاز تدليك احترافي بتقنية الاهتزاز + زيت الزنجبيل الطبيعي 100%. تركيبة طبية متطورة تستهدف السيلوليت من الجذور لنتائج مرئية خلال 30 يوم من الاستخدام المنتظم.',
    price: 239,
    currency: 'SAR',
    images: [
      '/images/products/anti-cellulite-kit-main.webp',
      '/images/products/anti-cellulite-kit-main.webp',
      '/images/products/anti-cellulite-kit-main.webp',
    ],
    benefits: [
      'يقلل مظهر السيلوليت بنسبة تصل إلى 80%',
      'زيت الزنجبيل الطبيعي 100% يحفز الدورة الدموية',
      'فرشاة تدليك احترافية لتفتيت الدهون',
      'نتائج مرئية خلال 30 يوم',
      'مناسب لجميع أنواع البشرة',
      'آمن وطبيعي بالكامل',
    ],
    howToUse: [],
    ingredients: [
      'زيت الزنجبيل الطبيعي',
      'فيتامين E',
      'زيت جوز الهند',
      'خلاصة الشاي الأخضر',
    ],
    rating: 4.8,
    reviewCount: 347,
    inStock: true,
    badge: 'الأكثر مبيعاً',
  },
  {
    id: '2',
    slug: 'cellulite-oil',
    sku: 'NV-OIL-002',
    name: 'زيت نوفيا للسيلوليت',
    nameEn: 'Nuvia Cellulite Oil',
    tagline: 'زيت يعالج بتركيبة طبية فريدة',
    description:
      'زيت نوفيا المركز لعلاج السيلوليت. تركيبة غنية بالزيوت الطبيعية والفيتامينات التي تغذي البشرة وتحسن مظهرها. يمتص بسرعة دون ترك أثر دهني.',
    price: 129,
    currency: 'SAR',
    images: [
      '/images/products/cellulite-oil.svg',
      '/images/products/cellulite-oil.svg',
    ],
    benefits: [
      'تركيبة مركزة سريعة الامتصاص',
      'يغذي البشرة بعمق',
      'يحسن مرونة الجلد',
      'رائحة طبيعية منعشة',
      'مناسب للاستخدام الليلي',
    ],
    howToUse: [
      'ضعي بضع قطرات على المنطقة المستهدفة',
      'دلكي بحركات دائرية حتى يمتص الزيت بالكامل',
      'استخدميه مرتين يومياً صباحاً ومساءً',
    ],
    ingredients: [
      'زيت الزنجبيل',
      'زيت اللافندر',
      'زيت الروزماري',
      'فيتامين E',
    ],
    rating: 4.7,
    reviewCount: 213,
    inStock: true,
    badge: 'جديد',
  },
  {
    id: '3',
    slug: 'body-massage-brush',
    sku: 'NV-BRUSH-003',
    name: 'فرشاة التدليك الاحترافية',
    nameEn: 'Professional Massage Brush',
    tagline: 'أداة التدليك المثالية لبشرة ناعمة',
    description:
      'فرشاة تدليك نوفيا الاحترافية مصنوعة خصيصاً لتحفيز الدورة الدموية وتفتيت الدهون تحت الجلد. تصميم مريح مناسب لجميع مناطق الجسم.',
    price: 89,
    currency: 'SAR',
    images: [
      '/images/products/massage-brush.svg',
      '/images/products/massage-brush.svg',
    ],
    benefits: [
      'تصميم مريح سهل الاستخدام',
      'تحفز الدورة الدموية',
      'تساعد في تفتيت الدهون',
      'مقاومة للماء',
      'عمر التراضي طويل',
    ],
    howToUse: [
      'استخدمي الفرشاة على بشرة جافة أو مع الزيت',
      'حركي بحركات دائرية من الأسفل للأعلى',
      'استخدميها لمدة 5-10 دقائق يومياً',
    ],
    ingredients: [],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: '4',
    slug: 'complete-cellulite-program',
    sku: 'NV-PROG-004',
    name: 'البرنامج الكامل لعلاج السيلوليت',
    nameEn: 'Complete Cellulite Treatment Program',
    tagline: 'كل ما تحتاجينه في باقة واحدة',
    description:
      'البرنامج الكامل يتضمن كيت مضاد السيلوليت + زيت نوفيا المركز + فرشاة التدليك الاحترافية + دليل الاستخدام المفصل. وفري 20% مقارنة بشراء المنتجات منفردة.',
    price: 299,
    currency: 'SAR',
    images: [
      '/images/products/complete-program.svg',
      '/images/products/complete-program.svg',
    ],
    benefits: [
      'توفير 20% مقارنة بالشراء المنفرد',
      'برنامج متكامل لمدة 60 يوم',
      'دليل استخدام مفصل خطوة بخطوة',
      'نتائج مضمونة مع الالتزام',
      'دعم كامل عبر الواتساب',
    ],
    howToUse: [
      'اتبعي دليل الاستخدام المرفق',
      'ابدئي بالفرشاة الجافة ثم الزيت ثم الكيت',
      'التزمي بالبرنامج لمدة 60 يوم',
    ],
    ingredients: [],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    badge: 'الأكثر مبيعاً',
  },
];
