import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';
import { convertTimeFormat } from '@/lib/date';

import { useGetTransactionDetail } from '@/data-hooks/transactions';

import PageTitle from '@/components/page-title/PageTitle';

import Layout from '@/layout/Main';
import Seo from '@/shared/Seo';

export default function TransactionDetailPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: TransactionDetail, isFetching } = useGetTransactionDetail(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.transactions')} />
      <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
        <PageTitle>Transaction Detail</PageTitle>

        <div className='flex-container m-auto flex-col flex-wrap gap-20 py-[30px]'>
          <div className='flex-item bg-orange-20 mb-[16px] flex h-full w-[1000px] items-center justify-between rounded-[30px] border-[1px] border-gray-500'>
            <div className='w-[160px] border-r border-gray-500 px-[20px] py-[16px] text-[16px] font-medium text-black'>
              Height
            </div>
            <div className='relative flex h-[50px] flex-grow items-center px-[20px] text-[20px] font-bold text-black'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                <span>{TransactionDetail?.header_height}</span>
              )}
            </div>
          </div>
          <div className='flex-item bg-orange-20 mb-[16px] flex h-full w-[1000px] items-center justify-between rounded-[30px] border-[1px] border-gray-500'>
            <div className='w-[160px] border-r border-gray-500 px-[20px] py-[16px] text-[16px] font-medium text-black'>
              Block time
            </div>
            <div className='relative flex h-[50px] flex-grow items-center px-[20px] text-[20px] font-bold text-black'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                <span>{convertTimeFormat(TransactionDetail?.header_time)}</span>
              )}
            </div>
          </div>
          <div className='flex-item bg-orange-20 mb-[16px] flex h-full w-[1000px] items-center justify-between rounded-[30px] border-[1px] border-gray-500'>
            <div className='w-[160px] border-r border-gray-500 px-[20px] py-[16px] text-[16px] font-medium text-black'>
              Type
            </div>
            <div className='relative flex h-[50px] flex-grow items-center px-[20px] text-[20px] font-bold text-black'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                <span>{TransactionDetail?.tx_type}</span>
              )}
            </div>
          </div>
          <div className='flex-item bg-orange-20 mb-[16px] flex h-full w-[1000px] items-center justify-between rounded-[30px] border-[1px] border-gray-500'>
            <div className='w-[160px] border-r border-gray-500 px-[20px] py-[16px] text-[16px] font-medium text-black'>
              Hash
            </div>
            <div className='relative flex h-[50px] flex-grow items-center px-[20px] text-[20px] font-bold text-black'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                <span>{TransactionDetail?.hash}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};
