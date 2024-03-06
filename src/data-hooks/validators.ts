import { useQuery } from '@tanstack/react-query';

import { getOverView, getValidatorBlocks, getValidatorDetail, getValidators,getValidatorSignatures } from '@/api-services/validators';
import { apiUrl } from '@/constant/api-url';
import { ValidatorResponse } from '@/models/validators';

export const useGetValidators = () => {
  return useQuery({
    queryKey: [apiUrl.VALIDATORS],
    queryFn: () => getValidators(),
    select(data) {
      return data?.data.validators?.map((item: ValidatorResponse) => new ValidatorResponse(item)) ?? [];
    },
  });
};

export const useGetValidatorDetail = (address: string) => {
  return useQuery({
    queryKey: [apiUrl.VALIDATOR, address],
    queryFn: () => getValidatorDetail(address),
    select(data) {
      return data;
    },
  });
}

export const useGetValidatorBlock = (address: string) => {
  return useQuery({
    queryKey: [apiUrl.VALIDATOR_BLOCKS, address],
    queryFn: () => getValidatorBlocks(address),
    select(data) {
      return data;
    },
  });
}

export const useGetValidatorSignature = (address: string) => {
  return useQuery({
    queryKey: [apiUrl.VALIDATOR_SIGNATURE, address],
    queryFn: () => getValidatorSignatures(address),
    select(data) {
      return data;
    },
  });
}

export const useGetOverView = () => {
  return useQuery({
    queryKey: [apiUrl.OVER_VIEW],
    queryFn: () => getOverView(),
    select(data) {
      return data?.data;
    },
  });
}
