"use client";
import React from 'react';

import { useTranslation } from 'react-i18next';

import DataStatsOne from '@/components/DataStats/DataStatsOne';

// import ChartOne from '@/components/Charts/ChartOne';
// import ChartThree from '../Charts/ChartThree';
// import ChartTwo from '../Charts/ChartTwo';

// import ChatCard from '../Chat/ChatCard';
// import MapOne from '../Maps/MapOne';
// import TableOne from '../Tables/TableOne';

const ECommerce: React.FC = () => {
  const { t } = useTranslation('common'); // Specify the namespace
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 mb-[5rem]">
        {/* <div>
          <h1>{t('welcome')}</h1>
          <button>{t('logout')}</button>
        </div> */}
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
