import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';
import { convertTimeFormat } from '@/lib/date';

import { useGetTransaction } from '@/data-hooks/transactions';

import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';
import PageTitle from '@/components/page-title/PageTitle';

import { getTransactions } from '@/api-services/transaction';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import Button from '@/shared/buttons/Button';
import Seo from '@/shared/Seo';

export default function Transactions() {
  const { t } = useTranslation();
  const [totalRecord, setTotalRecord] = useState(20);
  const { data: Transactions, isFetching } = useGetTransaction(totalRecord);
  const [transactionList, setTransactionList] = useState([]);

  const handleClick = () => {
    setTotalRecord(totalRecord + 20);
  };

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
          <PageTitle>Transactions</PageTitle>
          {/*Blocks list */}
          <div className='top-list py-[10px]'>
            <table className='w-full table-auto border-gray-200 mb-[20px] text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>Block</th>
                  <th className='w-1/5 text-center border-r'>Hash</th>
                  <th className='w-[10px] text-center border-r'>Type</th>
                  <th className='w-20 text-center rounded-tr-r'>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactionList?.map((item: any, index: number) => (
                    <tr key={item?.header_height}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                  >
                      <td className='text-center w-1/3'>
                        <Link href={`${appRouters.TRANSACTIONS}/${item.hash}`} className='w-[100px] text-center px-[20px] underline'>
                          <MiddleEllipsisText text={item.block_id} />
                        </Link>
                      </td>
                    <td className='text-center w-1/3'>
                      <MiddleEllipsisText text={item.hash} />
                    </td>
                    <td className='text-center w-[20px]'>
                      {item.tx_type}
                    </td>
                    <td className='text-center'>{convertTimeFormat(item.header_time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center'>
              <Button onClick={handleClick} className='relative' isLoading={isFetching}>
                <span>See More</span>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([apiUrl.TRANSACTIONS]), () => getTransactions(20);

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

