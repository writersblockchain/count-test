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
  "e674683faafc8e2ace08e9c62d0c1a9e0ea96727926859753837b3c2095b92d5";
let contractAddress = "secret14590efcwwxlm32wggzz7h644ukgv9ty6x7l37d";

let try_execute = async () => {
  const tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      msg: {
        increment: {},
      },
      code_hash: codeHash,
    },
    { gasLimit: 100_000 }
  );

  console.log(tx);
};
try_execute();
