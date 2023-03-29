import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { oraiConfig } from "./networks";
import { uploadContracts } from "./helpers/uploadContracts";
import { instantiateContract } from "./helpers/cw20";

const contracts: Contract[] = [
  {
    name: "cw20_base",
    wasmFile: "./contracts/cw20_base.wasm",
  },
];

async function main(): Promise<void> {

  console.log("Uploading contract...");
  
  // get the mnemonic of the contract
  const mnemonic = getMnemonic();

  // get the signingclient
  const {client, address} = await connect(mnemonic, oraiConfig);

  // check if the given wallet has enough balance
  let {amount} = await client.getBalance(address, oraiConfig.feeToken);
  console.log(`balance of ${address} is ${amount}`);

  // upload the contract
  const codeID = await uploadContracts(client, address, contracts);
  console.log(`code ID: ${codeID.cw20_base}`);

  // instantiate the contract
  const contractAddress = await instantiateContract(client, address, codeID.cw20_base);

  console.log(`contract ${contractAddress} is created`);
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
