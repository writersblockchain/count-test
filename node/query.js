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
  "cc0179ef9eacb62c5a444fe1a99706e0b70ab427023eeb0825ccd1626f74f807";
let contractAddress = "secret1kawxj64vhn2vfgh2pz7cjl34s6vdr2eng9hwwz";

let query_contract = async () => {
  let my_query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: codeHash,
    query: { get_count: {} },
  });
  console.log("count: ", my_query);
};
query_contract();
