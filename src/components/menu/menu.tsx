import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { appRouters } from '@/constant/app-routers';
import UnstyledLink from '@/shared/links/UnstyledLink';

export default function Menu() {
  const { t } = useTranslation();
  const links = [
    { href: appRouters.HOME, label: t('page.home') },
    { href: appRouters.VALIDATORS, label: t('page.validators') },
    { href: appRouters.BLOCKS, label: t('page.blocks') },
    { href: appRouters.TRANSACTIONS, label: t('page.transactions') },
  ];

  const router = useRouter();
  const isActiveRouter = (currentRouter: string) => {
    return router.pathname === currentRouter || router.pathname.startsWith(`${currentRouter}/`);
  };

  return (
    <>
      <div className="w-[200px] bg-orange-30 fixed left-0 top-0 mt-[80px] h-screen">
        <nav className="mt-[40px]">
          <ul>
            {links.map(({ href, label }) => (
            <React.Fragment key={`${href}${label}`}>
              <li className='relative w-[200px] mt-[10px]'>
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'text-white block h-[50px] px-[10px] text-center text-base font-bold uppercase leading-[50px] hover:bg-gray-500 hover:text-white',
                    { 'bg-gray-600 text-white': isActiveRouter(href) },
                  )}
                >
                  {label}
                </UnstyledLink>
              </li>
            </React.Fragment>
          ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
