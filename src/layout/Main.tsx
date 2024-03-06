import * as React from 'react';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Menu from '@/components/menu/menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Header />
      <div className="flex mt-[80px]">
        <Menu/>
        {children}
      </div>
      <Footer />
    </>
  );
}
