import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';
import { convertTimeFormat } from '@/lib/date';

import { useGetValidatorBlock, useGetValidatorDetail, useGetValidatorSignature } from '@/data-hooks/validators';

import PageTitle from '@/components/page-title/PageTitle';

import Layout from '@/layout/Main';
import Seo from '@/shared/Seo';

export default function ValidatorDetail() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: ValidatorDetail, isFetching } = useGetValidatorDetail(id);
  const { data: ValidatorBlocks  } = useGetValidatorBlock(id);
  const { data: ValidatorSignature } = useGetValidatorSignature(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.validators')} />
      <div className='main font-Quantico px-[20px] ml-[200px] bg-orange-10 w-full'>
        <PageTitle>Validator Detail</PageTitle>
        <div className='top-list py-[10px]'>
          <div className='py-[20px] text-[24px] font-bold'>Validated Blocks</div>
          <table className='mb-[20px] w-full table-auto border-gray-200'>
            <thead>
              <tr className='bg-orange-30 h-[50px] px-[20px]'>
                <th className='w-20 text-center rounded-tr-l border-r'>Height</th>
                <th className='w-1/5 text-center border-r'>Block Id</th>
                <th className='w-[10px] text-center rounded-tr-r'>Time</th>
              </tr>
            </thead>
            <tbody>
              {ValidatorDetail?.validatedBlocks.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={clsxm('border-gray-5 00 my-1 h-[50px] w-full border-b', {
                    'bg-orange-20': index % 2 !== 0,
                  })}
                >
                  <td className='truncate px-6 text-center'>{item.header_height}</td>
                  <td className='text-center'>{item.block_id}</td>
                  <td className='text-center'>{convertTimeFormat(item.header_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Uptime */}
        <div className='flex top-list py-[10px]'>
          <div className='w-[calc(50%-100px)] mr-[10px] text-black'>
            <div className='py-[20px] text-[24px] font-bold'>Uptime</div>
            <table className='mb-[20px] w-full table-auto border-gray-200'>
              <thead>
                <tr className='bg-orange-30 h-[50px] px-[20px]'>
                  <th className='text-center rounded-tr-l border-r'>Block number</th>
                  <th className='text-center rounded-tr-r'>Sign status</th>
                </tr>
              </thead>
              <tbody>
                {ValidatorDetail?.uptime.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={clsxm('border-gray-5 00 my-1 h-[50px] w-full border-b', {
                      'bg-orange-20': index % 2 !== 0,
                    })}
                  >
                    <td className='truncate px-6 text-center'>{item.block_number}</td>
                    <td className='text-center'>{item.sign_status ? 'True' : 'False'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home'])))
    },
  };
};
