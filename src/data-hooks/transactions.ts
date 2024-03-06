import { useQuery } from '@tanstack/react-query';

import { getTransactionDetail, getTransactions } from '@/api-services/transaction';
import { apiUrl } from '@/constant/api-url';

export const useGetTransaction = () => {
  return useQuery({
    queryKey: [apiUrl.TRANSACTIONS],
    queryFn: () => getTransactions(),
    select(data) {
        return data?.data.proposals;
    },
  });
};

export const useGetTransactionDetail = (hash: string) => {
  return useQuery({
    queryKey: [apiUrl.TRANSACTION, hash],
    queryFn: () => getTransactionDetail(hash),
    select(data) {
      return data;
    },
  });
}
