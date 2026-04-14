import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-secondary mb-3">404</h1>
        <p className="text-nuvia-light text-lg mb-8">
          عذراً! الصفحة التي تبحثين عنها غير موجودة.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-full font-bold shadow-gold hover:shadow-gold-lg transition-all"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
