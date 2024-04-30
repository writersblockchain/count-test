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
let query_contract = async () => {
  let my_query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: codeHash,
    query: { get_random: {} },
  });
  console.log("random u8: ", my_query);
};
query_contract();
