import { convertTimeFormat } from '@/lib/date';

import { HttpResponse } from '@/types/common';

export interface LastestBlock {
  block_id: string;
  header_version_app?: number;
  header_version_block?: number;
  header_chain_id?: string;
  height: string;
  time: string;
  header_last_block_id_hash?: string;
  header_last_block_id_parts_header_total?: number;
  header_last_block_id_parts_header_hash?: string;
  header_last_commit_hash?: string;
  hash: string;
  header_validators_hash?: string;
  header_next_validators_hash?: string;
  header_consensus_hash?: string;
  header_app_hash?: string;
  header_last_results_hash?: string;
  header_evidence_hash?: string;
  header_proposer_address: string;
  commit_height?: number;
  commit_round?: number;
  commit_block_id_hash?: string;
  commit_block_id_parts_header_total?: number;
  commit_block_id_parts_header_hash?: string;
  transactions: Array<string>;
  proposer: string;
  moniker: string;
}

export class LastestBlockResponse {
  block_id: string;
  height: string;
  hash: string;
  time: string;
  header_proposer_address: string;
  transactions: Array<string>;
  proposer: string;
  moniker: string;

  constructor(props?: LastestBlock) {
    this.block_id = props?.block_id ?? '';
    this.height = props?.height ?? '';
    this.hash = props?.hash ?? '';
    this.time = convertTimeFormat(props?.time) ?? '';
    this.header_proposer_address = props?.header_proposer_address ?? '';
    this.transactions = props?.transactions ?? [];
    this.proposer = props?.proposer ?? '';
    this.moniker = props?.moniker ?? '';
  }
}

export type LastestBlockRes = HttpResponse<{
  lastestBlocks: LastestBlockResponse;
}>;
