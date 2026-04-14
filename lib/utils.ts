export function formatPrice(price: number, currency: string = 'SAR'): string {
  return `${price} ${currency}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    SA: 'المملكة العربية السعودية',
    KW: 'الكويت',
    AE: 'الإمارات',
    BH: 'البحرين',
    OM: 'عُمان',
    QA: 'قطر',
  };
  return countries[code] || code;
}
