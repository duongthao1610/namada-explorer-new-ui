import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';
import { LastestBlockResponse } from '@/models/lastestBlock';

const headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE`
      };

export const getLastestBlock = async () => {
  const response = await axios.get<LastestBlockResponse>(apiUrl.LASTEST_BLOCK);
  return response;
};

export const getLastestBlockList = async () => {
  const response = await axios.get(apiUrl.BLOCK_LIST, {headers});
  return response;
};

export const getBlockDetail = async (id: string) => {
  const response = await axios.get((apiUrl.BLOCK + '?height=' + id), {headers});

  return response.data?.data;
};

export const getBlockSignatures = async (id: string) => {
  const response = await axios.get(apiUrl.BLOCK_LIST + '/' + id + '/signatures');

  return response.data;
};

export const getBlockTransactions = async (id: string) => {
  const response = await axios.get(apiUrl.BLOCK_LIST + '/' + id + '/transactions');

  return response.data;
};
