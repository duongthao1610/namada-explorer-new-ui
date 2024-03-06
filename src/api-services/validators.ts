import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';

const headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwODQzNjMsImV4cCI6MTcxNzQ1MjM2M30.4Fk2-GpkRKK7SiTN4AgpmLUWUGTidBDYcIe-U_tacaE`
};

export const getValidators = async () => {
  const response = await axios.get(apiUrl.VALIDATORS, {headers});

  return response.data;
};

export const getValidatorDetail = async (address: string) => {
  const response = await axios.get((apiUrl.VALIDATOR + '/' + address), {headers});

  return response.data;
};

export const getValidatorBlocks = async (address: string) => {
  const response = await axios.get(apiUrl.VALIDATOR + '/' + address + 'latestBlocks');

  return response.data;
};

export const getValidatorSignatures = async (address: string) => {
  const response = await axios.get(apiUrl.VALIDATOR + '/' + address + 'latestSignatures');

  return response.data;
};

export const getOverView = async () => {
  const response = await axios.get((apiUrl.OVER_VIEW), {headers});

  return response.data;
};
