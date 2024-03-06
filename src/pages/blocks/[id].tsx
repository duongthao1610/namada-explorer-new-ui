import { dehydrate,QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from 'react';
import { useTranslation } from "react-i18next";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";

import { useGetBlockDetail, useGetBlockSignatures, useGetBlockTransactions } from "@/data-hooks/lastestBlock";

import PageTitle from "@/components/page-title/PageTitle";

import Layout from "@/layout/Main";
import Seo from "@/shared/Seo";

export default function BlockDetailPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: BlockDetail, isFetching } = useGetBlockDetail(id);
  console.log(BlockDetail)
  // const { data: BlockSignatures, isFetching: signatureFetching } = useGetBlockSignatures(id);
  // const { data: BlockTransactions, isFetching: transitionsFetching } = useGetBlockTransactions(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.blocks')} />
      <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
        <PageTitle>Block Detail</PageTitle>
        <div className='flex-container m-auto flex-col flex-wrap gap-20 py-[30px]'>
          <div className='flex-item bg-orange-20 h-full w-[1000px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
            <div className='w-[160px] py-[16px] text-[16px] font-medium text-black px-[20px] border-r border-gray-500'>
              Height
            </div>
            <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
              {isFetching ? (
              <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                <ImSpinner2 className='animate-spin' />
              </div>
              ) : (
                <span>{BlockDetail?.height}</span>)}
            </div>
          </div>
          <div className='flex-item bg-orange-20 h-full w-[1000px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
            <div className='w-[160px] border-r border-gray-500 py-[16px] text-[16px] font-medium text-black px-[20px]'>
              Block time
            </div>
            <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
              {isFetching ? (
              <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                <ImSpinner2 className='animate-spin' />
              </div>
              ) : (
                <span>{BlockDetail?.time}</span>)}
            </div>
          </div>
          <div className='flex-item bg-orange-20 h-full w-[1000px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
            <div className='w-[160px] border-r border-gray-500 py-[16px] text-[16px] font-medium text-black px-[20px]'>
              Number of Txs
            </div>
              <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
            {isFetching ? (
              <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                <ImSpinner2 className='animate-spin' />
              </div>
              ) : (
                <span>{BlockDetail?.transactions.length}</span>)}
              </div>
          </div>
          <div className='flex-item bg-orange-20 h-full w-[1000px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
            <div className='w-[160px] border-r border-gray-500 py-[16px] text-[16px] font-medium text-black px-[20px]'>
              Proposer
            </div>
              <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
            {isFetching ? (
              <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                <ImSpinner2 className='animate-spin' />
              </div>
              ) : (
                <span>{BlockDetail?.proposer}</span>)}
              </div>
          </div>
          <div className='flex-item bg-orange-20 h-full w-[1000px] flex items-center justify-between rounded-[30px] border-[1px] border-gray-500 mb-[16px]'>
            <div className='w-[160px] border-r border-gray-500 py-[16px] text-[16px] font-medium text-black px-[20px]'>
              Hash
            </div>
              <div className='relative flex h-[50px] flex-grow items-center text-[20px] font-bold text-black px-[20px]'>
            {isFetching ? (
              <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                <ImSpinner2 className='animate-spin' />
              </div>
              ) : (
                <span>{BlockDetail?.hash}</span>)}
              </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className='w-[calc(80%-10px)] mr-[10px]'>
            <div className='py-[20px] text-[24px] font-bold'>SIGNATURES</div>
            <div className='relative h-[300px] overflow-y-auto p-[20px] mb-[24px] rounded-[20px] bg-orange-20 shadow-lg'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
              BlockDetail.signatures?.map((item: any, index: any) => (
                item?.signature != '' &&
                <div className='h-[50px] bg-orange-20 py-[12px] px-[16px] mb-[8px] border-b border-gray-500 text-black' key={index}> {item?.signature}</div>
              )))}
            </div>
          </div>
          <div className='w-[calc(80%-10px)] ml-[10px]'>
            <div className='py-[20px] text-[24px] font-bold'>TRANSACTIONS</div>
            <div className='relative h-[300px] overflow-y-auto p-[20px] mb-[24px] rounded-[20px] bg-orange-20 shadow-lg'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                BlockDetail?.transactions?.map((item: any, index: any) => (
                  item != '' &&
                  <div className='h-[50px] py-[12px] px-[16px] mb-[8px] border-b border-gray-500 text-black' key={index}>{item}</div>
                )))}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query as { id: string };
  const queryClient = new QueryClient();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};