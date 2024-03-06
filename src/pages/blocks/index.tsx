import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import {
  useGetLastestBlockList
} from '@/data-hooks/lastestBlock';

import PageTitle from '@/components/page-title/PageTitle';

import { getLastestBlockList } from '@/api-services/lastTestBlock';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { LastestBlock } from '@/models/lastestBlock';
import Button from '@/shared/buttons/Button';
import Seo from '@/shared/Seo';
import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';
import { ImSpinner2 } from 'react-icons/im';

export default function Blocks() {
  const { t } = useTranslation();
  const [totalRecord, setTotalRecord] = useState(20);
  const { data: BlocksList, isFetching } = useGetLastestBlockList();
  const [blockList, setBlockList] = useState([]);

  const handleClick = () => {
    setTotalRecord(totalRecord + 20);
  };

  useEffect(() => {
    if(!isFetching) {
      setBlockList(BlocksList);
    }
  }, [isFetching]);

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.blocks')} />
        <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
          <PageTitle>Blocks List</PageTitle>
          {/*Blocks list */}
          <div className='top-list py-[10px]'>
            <table className='w-full table-auto border-gray-200 text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>Block height</th>
                  <th className='w-1/5 text-center border-r'>Hash</th>
                  <th className='w-[10px] text-center border-r'>Proposer</th>
                  <th className='w-20 text-center border-r'>Nb of Txs</th>
                  <th className='w-20 text-center rounded-tr-r'>Time</th>
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
                  {blockList?.slice(0, 10).map((item: LastestBlock, index: any) => (
                    <tr
                      key={item.height}
                      className={clsxm('border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                    >
                      <td className='text-center'>
                        <Link href={`${appRouters.BLOCKS}/${item.height}`} className='w-[100px] text-center px-[20px] underline'>
                          {item.height}
                        </Link>
                      </td>
                      <td className='truncate px-6 text-center'>
                        <MiddleEllipsisText text={item.hash} />
                      </td>
                      <td className='text-center'>{item.proposer}</td>
                      <td className='text-center'>{item.transactions.length}</td>
                      <td className='text-center'>{item.time}</td>
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

  await queryClient.prefetchQuery([apiUrl.LASTEST_BLOCK_LIST]), () => getLastestBlockList();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

