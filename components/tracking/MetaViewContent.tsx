'use client';

import { useEffect } from 'react';

export default function MetaViewContent() {
  useEffect(() => {
    // Delay 2s so the pixel fires after the page is fully interactive — avoids TBT
    const t = setTimeout(() => {
      const fbq = (window as unknown as Record<string, unknown>).fbq as ((...a: unknown[]) => void) | undefined;
      if (fbq) fbq('track', 'ViewContent', {
        content_ids:  ['NV-RF-005'],
        content_type: 'product',
        value:        399,
        currency:     'SAR',
      });
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return null;
}
