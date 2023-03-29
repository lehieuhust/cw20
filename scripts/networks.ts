// data from https://github.com/cosmos/chain-registry/tree/master/testnets
import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from '@cosmjs/math';

export interface Network {
  chainId: string;
  rpcEndpoint: string;
  prefix: string;
  gasPrice: GasPrice;
  feeToken: string;
}

export const oraiConfig: Network = {
  chainId: "testing",
  rpcEndpoint: "http://0.0.0.0:26657",
  prefix: "orai",
  gasPrice: new GasPrice(Decimal.fromUserInput('1', 6), "orai"),
  feeToken: "orai",
};
