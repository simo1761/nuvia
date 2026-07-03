'use client';

import { useEffect } from 'react';

export default function MetaViewContent() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fbq = (window as unknown as Record<string, unknown>).fbq as ((...a: unknown[]) => void) | undefined;
    if (!fbq) return;
    fbq('track', 'ViewContent', {
      content_ids:  ['NV-RF-005'],
      content_type: 'product',
      value:        239,
      currency:     'SAR',
    });
  }, []);

  return null;
}
