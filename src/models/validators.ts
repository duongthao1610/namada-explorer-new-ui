
import { HttpResponse } from '@/types/common';

export interface PubKey {
  type: string;
  value: string;
}

export interface Validator {
  address: string;
  address_hex: string;
  pub_key?: PubKey;
  voting_power: string,
  proposer_priority: string,
  voting_percentage: number,
  moniker: string,
  operator_address: string;
  commission_rate: string;
  status: string;
  tokens?: number;
}

export class ValidatorResponse {
  address: string;
  address_hex: string;
  voting_power: string;
  proposer_priority: string;
  voting_percentage: number;
  moniker: string;
  operator_address: string;
  commission_rate: string;
  status: string;
  tokens: number;

  constructor(props?: Validator) {
    this.address = props?.address ?? '';
    this.address_hex = props?.address_hex ?? '';
    this.voting_power = props?.voting_power ?? '';
    this.proposer_priority = props?.proposer_priority ?? '';
    this.voting_percentage = props?.voting_percentage ?? 0;
    this.moniker = props?.moniker ?? '';
    this.operator_address = props?.operator_address ?? '';
    this.commission_rate = props?.commission_rate ?? '';
    this.status = props?.status ?? '';
    this.tokens = props?.tokens ?? 0;
  }
}

export type ValidatorsResponse = HttpResponse<{
  Validators: ValidatorResponse[];
}>;

