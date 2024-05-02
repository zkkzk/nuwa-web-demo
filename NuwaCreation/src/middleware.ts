import createMiddleware from 'next-intl/middleware';
import {locales,} from './navigation';
import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';

import { NextRequest, NextResponse } from 'next/server'

export default createMiddleware({
  defaultLocale: 'en',
  locales
});

 
// export function middleware(request: NextRequest) {
//   createMiddleware({
//     defaultLocale: 'en',
//     locales
//   });
//   // request.next();
 
//   if (request.nextUrl.pathname.startsWith('/') || request.nextUrl.pathname.startsWith('(en|zh-CN)/:path*')) {
//     // This logic is only applied to /about
//   }
 
//   if (request.nextUrl.pathname.startsWith('/((?!api|_next/static|_next/image|.*\\.png$).*)')) {
//     // This logic is only applied to /dashboard
//   }
// }

 
// export default NextAuth(authConfig).auth(createMiddleware({
//   defaultLocale: 'en',
//   locales
// }));
 
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh-CN)/:path*']
};