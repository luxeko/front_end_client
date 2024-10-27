import createMiddleware from 'next-intl/middleware';
import { localePrefix, defaultLocale, locales, pathnames } from './config';
import { defineRouting } from 'next-intl/routing';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// export default createMiddleware({
//     defaultLocale,
//     locales,
//     localePrefix,
//     pathnames,
//     localeDetection: true,
// });
export const routing = defineRouting({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
  // localeDetection: true,
});

const publicPages = [
  '/',
  '/login',
  '/cart',
  '/checkout',
  '/register',
  '/products',
  '/products/:id*',
  '/vi',
  '/en',
  '/cart',
];

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  async function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => token !== null,
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLogin = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register');
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .map(p => p.replace(/:\w+\*/g, '[^/]+'))
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  if (isPublicPage) {
    if (isAuthPage && isLogin && token.role === 'client') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(vi|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // '/((?!proxy|favicon.ico).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)'
  ],
};
