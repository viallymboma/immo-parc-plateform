import React from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { GoldenLongVersion } from '@/components/svgs/SvgIcons';

import SignupModule from './_components/SignupModule';

export const metadata: Metadata = {
  title: "Immo-parc Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <div className='mx-auto p-2 max-w-7xl'>
      <Breadcrumb pageName="Enregistrement" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              {/* <Signin /> */}
              <SignupModule />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <GoldenLongVersion width="176" height="32" />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Commencez gratuitement
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Content de vous revoir!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Pour créer votre compte veuillez remplir les champs nécessaires ci-contre
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
