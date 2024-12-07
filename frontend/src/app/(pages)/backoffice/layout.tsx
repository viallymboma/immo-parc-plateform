"use client";
// import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';

import React from 'react';

import MainLayout from '@/components/common/backbone/MainLayout';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <MainLayout>
      { children }
    </MainLayout>
  );
}

// export default appWithTranslation(RootLayout);
export default RootLayout;