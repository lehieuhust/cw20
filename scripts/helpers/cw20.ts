import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../../bindings/Cw20Base.types";
import { coin } from "@cosmjs/amino"

export async function instantiateContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    decimals: 6,
    initial_balances: [{
      address: address,
      amount: "1000000",
    },],
    name: "foo coin",
    symbol: "foo"
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "cw20 contract",
    100,
    {
      admin: address,
    }
  );
  return info.contractAddress;
}

export async function excecuteContract(
  client: SigningCosmWasmClient,
  senderAddress: string,
  contractAddress: string,
) {
  const transfer: ExecuteMsg = {
    transfer: {
      amount: "5000",
      recipient: "orai1lvjxm59tyldn0853lhxzhe7mwynnsgfdke8fs9"
    },
  };
  let res = await client.execute(
    senderAddress,
    contractAddress,
    transfer,
    'auto',
    '',
    [coin(300, "orai")],
  );
  console.log("transfer token res:");
  console.log(res);

}

export async function queryContract(
  client: SigningCosmWasmClient,
  contractAddress: string,
) {
  const queryToken: QueryMsg = {
    token_info: {}
  };
  const query_token_res = await client.queryContractSmart(
    contractAddress,
    queryToken
  );
  console.log('token: ',query_token_res);

}