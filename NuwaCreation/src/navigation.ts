import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'zh-CN'] as const;
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});