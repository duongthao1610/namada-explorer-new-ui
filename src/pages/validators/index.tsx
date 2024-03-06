import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import { useGetValidators } from '@/data-hooks/validators';

import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';
import PageTitle from '@/components/page-title/PageTitle';

import { getValidators } from '@/api-services/validators';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { ValidatorResponse } from '@/models/validators';
import Seo from '@/shared/Seo';

export default function Validators() {
  const { t } = useTranslation();
  const { data: Validators, isFetching } = useGetValidators();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = Validators?.filter((item: ValidatorResponse) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.validators')} />
        <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
          <PageTitle>Validators List</PageTitle>
          <div className="relative float-right mb-[20px]">
            <input
              type="text"
              className="border border-gray-500 rounded-[30px] pl-10 pr-4 py-2 focus:outline-none focus:ring-orange-500 w-[300px]"
              placeholder="Search by address"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <div className='top-list py-[10px]'>
            <table className='w-full table-auto border-gray-200 mb-[20px] text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>Address</th>
                  <th className='w-1/5 text-center border-r'>Moniker</th>
                  <th className='w-[10px] text-center border-r'>Voting power</th>
                  <th className='w-20 text-center rounded-tr-r'>Proposer priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item: any, index: number) => (
                    <tr key={index}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                  >
                      <td className='text-center w-1/3'>
                      <Link href={`${appRouters.VALIDATORS}/${item.address}`} className='w-[100px] text-center px-[20px] underline'>
                          <MiddleEllipsisText text={item.address} />
                        </Link>
                      </td>
                    <td className='text-center w-1/3'>
                      <MiddleEllipsisText text={item.moniker} />
                    </td>
                    <td className='text-center w-[20px]'>
                      {item.voting_power}
                    </td>
                    <td className='text-center'>{item.proposer_priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([apiUrl.VALIDATORS]), () => getValidators();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

