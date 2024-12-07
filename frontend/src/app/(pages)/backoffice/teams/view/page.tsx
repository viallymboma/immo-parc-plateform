import React from 'react';

import { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import UserTable from '@/components/Tables/AllTables/UserTable';

export const metadata: Metadata = {
  title: "Team view Page | Immo-parc - Next.js Dashboard Tool",
  description: "This is Team view page for Immo-parc. Nero-Tech Tailwind CSS Admin Dashboard Tool",
};

const TeamPageView = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Visuel de mon equipe" />
      <ReturnHeader
        headerName='Mon equipe'
        returnBtnLabel='Retour'
        returnLink='/backoffice'
      />
      <div>
        <UserTable />
      </div>
    </div>
  )
}

export default TeamPageView