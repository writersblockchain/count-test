import { SecretNetworkClient, Wallet, coinsFromString } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(
  "desk pigeon hammer sleep only mistake stool december offer patrol once vacant"
);

const secretjs = new SecretNetworkClient({
  chainId: "pulsar-3",
  url: "https://api.pulsar3.scrttestnet.com",
  wallet: wallet,
  walletAddress: wallet.address,
});

let codeHash =
  "26d37f5afbbd7d059a09e6861307841dc218cd5d9fcb68d13641cc39219495ef";
let contractAddress = "secret15rgrmvqwz22sucgpqjmhq83hfrqc0xfdchg78v";

let try_execute = async () => {
  const tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      msg: {
        increment: {contract: "secret14590efcwwxlm32wggzz7h644ukgv9ty6x7l37d"},
      },
      code_hash: codeHash,
    },
    { gasLimit: 100_000 }
  );

  console.log(tx);
};
try_execute();
