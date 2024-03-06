import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';

const headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE`
      };

export const getTransactions = async () => {
  const response = await axios.get((apiUrl.TRANSACTIONS + '/'), {headers});
  return response.data;
};

export const getTransactionDetail = async (hash: string) => {
  const response = await axios.get(apiUrl.TRANSACTION + '/' + hash);

  return response.data;
};
