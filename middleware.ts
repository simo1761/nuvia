import { NextRequest, NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.PREVIEW_SECRET ?? 'nuvia-admin-preview';
const PREVIEW_COOKIE = 'nuvia_preview';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip geo/preview logic for internal Next.js paths and API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/not-available') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // ?preview=SECRET → set cookie and redirect to clean URL
  const previewParam = searchParams.get('preview');
  if (previewParam === PREVIEW_SECRET) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('preview');
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set(PREVIEW_COOKIE, '1', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    return res;
  }

  // Preview cookie present → bypass geo-restriction
  if (request.cookies.get(PREVIEW_COOKIE)?.value === '1') {
    return NextResponse.next();
  }

  // Geo-restriction: Cloudflare sets cf-ipcountry on all proxied requests
  const country = request.headers.get('cf-ipcountry');
  if (country && country !== 'SA') {
    return NextResponse.redirect(new URL('/not-available', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|not-available|images|videos|favicon.ico).*)'],
};
