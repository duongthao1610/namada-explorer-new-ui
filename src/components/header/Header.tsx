import NamadaLogo from 'public/svg/logo.png';
import * as React from 'react';

import NextImage from '@/shared/NextImage';

export default function Header() {
  return (
    <>
      <header className='fixed top-0 left-0 right-0 bg-black z-50'>
        <div className='flex items-center justify-between px-[30px] h-[80px]'>
          <NextImage src={NamadaLogo} alt='Try' className='w-[200px]' />
        </div>
      </header>
    </>
  );
}
