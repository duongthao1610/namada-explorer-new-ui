import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

import { useGetTransaction } from '@/data-hooks/transactions';

import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';
import PageTitle from '@/components/page-title/PageTitle';

import { getTransactions } from '@/api-services/transaction';
import { apiUrl } from '@/constant/api-url';
import Layout from '@/layout/Main';
import Seo from '@/shared/Seo';

export default function Transactions() {
  const { t } = useTranslation();
  const { data: Transactions, isFetching } = useGetTransaction();
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    if(!isFetching) {
      setTransactionList(Transactions);
    }
  }, [isFetching]);

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.transactions')} />
        <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
          <PageTitle>Proposals</PageTitle>
          {/*Blocks list */}
          <div className='top-list py-[10px]'>
            <table className='w-full table-auto border-gray-200 mb-[20px] text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>ID</th>
                  <th className='w-1/5 text-center border-r'>Author</th>
                  <th className='w-[10px] text-center border-r'>Start Epoch</th>
                  <th className='w-20 text-center border-r'>End Epoch</th>
                  <th className='w-20 text-center rounded-tr-r'>Type</th>
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
                  {transactionList?.map((item: any, index: number) => (
                    <tr key={item?.header_height}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                    >
                      <td className='text-center w-1/8'>
                        {item.proposal_id}
                      </td>
                      <td className='text-center w-1/3'>
                        <MiddleEllipsisText text={item.author} />
                      </td>
                      <td className='text-center w-[20px]'>
                        {item.start_epoch}
                      </td>
                      <td className='text-center w-[20px]'>
                        {item.end_epoch}
                      </td>
                      <td className='text-center'>{item.type}</td>
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

  await queryClient.prefetchQuery([apiUrl.TRANSACTIONS]), () => getTransactions();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

