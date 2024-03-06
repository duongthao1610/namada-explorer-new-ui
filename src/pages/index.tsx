import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

import { useGetOverView } from '@/data-hooks/validators';

import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';

import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { LastestBlock } from '@/models/lastestBlock';
import { ValidatorResponse } from '@/models/validators';
import Seo from '@/shared/Seo';

export default function HomePage() {
  const { t } = useTranslation();
  const { data: overView, isFetching } = useGetOverView();
  console.log(overView)

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.home')} />
        <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
          <div className='flex-container m-auto flex-col flex-wrap gap-20 py-[30px]'>
            <div className='flex-item bg-orange-20 h-full w-[800px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
              <div className='w-[160px] py-[16px] text-[16px] font-medium text-black px-[20px] border-r border-gray-500'>
                Latest Block
              </div>
              <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
                {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{overView?.last_height}</span>)}
              </div>
            </div>
            <div className='flex-item bg-orange-20 h-full w-[800px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
              <div className='w-[160px] border-r border-gray-500 py-[16px] text-center text-[16px] font-medium text-black px-[20px]'>
                Block time
              </div>
              <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
                {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>~ {Math.round(overView?.avg_blocktime)} Sec</span>)}
              </div>
            </div>
            <div className='flex-item bg-orange-20 h-full w-[800px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
              <div className='w-[160px] border-r border-gray-500 py-[16px] text-center text-[16px] font-medium text-black px-[20px]'>
                Active Validators
              </div>
                <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{overView?.nb_validators}</span>)}
                </div>
            </div>
            <div className='flex-item bg-orange-20 h-full w-[800px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
              <div className='w-[160px] border-r border-gray-500 py-[16px] text-center text-[16px] font-medium text-black px-[20px]'>
                Total Stake
              </div>
                <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{Math.round(overView?.total_stake)}</span>)}
                </div>
            </div>
          </div>

          {/* Validator list */}
          <div className='top-list'>
            <div className='py-[20px] text-[24px] font-bold'>TOP 10 VALIDATORS</div>
            <table className='w-full table-auto border-gray-200 text-black'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>Moniker</th>
                  <th className='w-1/5 text-center border-r'>Address</th>
                  <th className='w-[10px] text-center border-r'>VP</th>
                  <th className='w-20 text-center rounded-tr-r'>Commission Rate</th>
                </tr>
              </thead>
              <tbody>
                {overView?.validators.map((item: ValidatorResponse, index: any) => (
                  <tr
                    key={index}
                    className={clsxm('border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                  >
                    <td className='w-20 text-center'>{item.moniker}</td>
                    <td className='text-center w-1/3'>
                      {item.address}
                    </td>
                    <td className='w-[10px] text-center'>{Math.round(item.tokens)}</td>
                    <td className='w-[20px] text-center'>{item.commission_rate}</td>
                    {/* <td className='w-[20px] text-center'>{Math.round(item.voting_percentage) / 100}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lastest Blocks list */}
          <div className='top-list py-[30px]'>
            <div className='py-[20px] text-[24px] font-bold'>LASTEST BLOCK</div>
            <table className='w-full table-auto border-gray-200 text-black'>
              <thead>
                <tr className='bg-orange-30 rounded-tr px-[20px]'>
                  <th className='w-20 text-center rounded-tr-l border-r'>Block height</th>
                  <th className='w-1/5 text-center border-r'>Hash</th>
                  <th className='w-[10px] text-center border-r'>Proposer</th>
                  <th className='w-20 text-center border-r'>Nb of Txs</th>
                  <th className='w-20 text-center rounded-tr-r'>Time</th>
                </tr>
              </thead>
              <tbody>
                {overView?.blocks.map((item: LastestBlock, index: number) => (

                    <tr key={item?.height}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-orange-20': index % 2 !== 0 })}
                  >
                      <td className='text-center'>
                        <Link href={`${appRouters.BLOCKS}/${item?.height}`} className='w-[100px] text-center px-[20px] underline'>
                          {item?.height}
                        </Link>
                      </td>
                      <td className='truncate px-6 text-center'><MiddleEllipsisText text={item.hash} /></td>
                      <td className='text-center'>{item?.proposer}</td>
                      <td className='text-center'>{item?.transactions.length}</td>
                      <td className='text-center'>{item?.time}</td>
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

  // await queryClient.prefetchQuery([apiUrl.LASTEST_BLOCK]), () => getOverView();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};
