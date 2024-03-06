import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

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

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = Validators?.filter((item: ValidatorResponse) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.validators')} />
        <div className='main font-Quantico bg-orange-10 ml-[200px] w-full px-[20px]'>
          <PageTitle>Validators List</PageTitle>
          <div className='relative float-right mb-[20px]'>
            <input
              type='text'
              className='w-[300px] rounded-[30px] border border-gray-500 py-2 pl-10 pr-4 focus:outline-none focus:ring-orange-500'
              placeholder='Search by address'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-6 w-6 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8'></circle>
                <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
              </svg>
            </div>
          </div>
          <div className='top-list py-[10px]'>
            <table className='mb-[20px] w-full table-auto border-gray-200 text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='rounded-tr-l w-20 border-r text-center'>Address</th>
                  <th className='w-1/5 border-r text-center'>Moniker</th>
                  <th className='w-[10px] border-r text-center'>commission_rate</th>
                  <th className='rounded-tr-r w-20 text-center'>status</th>
                </tr>
              </thead>
              {isFetching ? (
                <tbody>
                  <tr>
                    <td className='relative'>
                      <div className={clsxm('absolute left-[600px] top-[25px] -translate-x-1/2 -translate-y-1/2', {})}>
                        <ImSpinner2 className='animate-spin' />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredData?.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={clsxm('border-gray-5 00 my-1 h-[50px] w-full border-b', {
                        'bg-orange-20': index % 2 !== 0,
                      })}
                    >
                      <td className='w-2/5 text-center'>
                          {item.address}
                      </td>
                      <td className='w-1/3 text-center'>
                        <MiddleEllipsisText text={item.moniker} />
                      </td>
                      <td className='w-[20px] text-center'>{item.commission_rate}</td>
                      <td className='text-center'>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              )}
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
