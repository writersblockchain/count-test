import "./App.css";
import { SecretNetworkClient } from "secretjs";
import { useState } from "react";

function App() {
  const [secretjs, setSecretjs] = useState(null);
  const [secretAddress, setSecretAddress] = useState("");

  const SECRET_CHAIN_ID = "pulsar-3";
  const SECRET_LCD = "https://api.pulsar3.scrttestnet.com";

  async function setupKeplr() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }

    await window.keplr.enable(SECRET_CHAIN_ID);
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: false,
        disableBalanceCheck: true,
      },
    };

    const keplrOfflineSigner =
      window.getOfflineSignerOnlyAmino(SECRET_CHAIN_ID);
    const accounts = await keplrOfflineSigner.getAccounts();

    const secretAddress = accounts[0].address;

    const secretjs = new SecretNetworkClient({
      url: SECRET_LCD,
      chainId: SECRET_CHAIN_ID,
      wallet: keplrOfflineSigner,
      walletAddress: secretAddress,
      encryptionUtils: window.getEnigmaUtils(SECRET_CHAIN_ID),
    });

    setSecretAddress(secretAddress);
    setSecretjs(secretjs);
  }

  async function connectWallet() {
    try {
      if (!window.keplr) {
        console.log("intall keplr!");
      } else {
        await setupKeplr(setSecretjs, setSecretAddress);
        localStorage.setItem("keplrAutoConnect", "true");
        console.log(secretAddress);
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }

  let codeHash =
    "e674683faafc8e2ace08e9c62d0c1a9e0ea96727926859753837b3c2095b92d5";
  let contractAddress = "secret14590efcwwxlm32wggzz7h644ukgv9ty6x7l37d";

  let try_execute = async () => {
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: secretAddress,
        contract_address: contractAddress,
        msg: {
          request_random: {},
        },
        code_hash: codeHash,
      },
      { gasLimit: 100_000 }
    );

    console.log(tx);
    alert(JSON.stringify(tx));
  };

  let query_contract = async () => {
    let my_query = await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: codeHash,
      query: { get_random: {} },
    });
    console.log("random u8: ", my_query);
    alert(JSON.stringify(my_query));
  };

  return (
    <div className="App">
      <p>Secret Network Randomness</p>
      <button onClick={try_execute}>Request Randomness</button>
      <button onClick={query_contract}>View Randomness</button>
      <button onClick={connectWallet}>Connect Keplr</button>
    </div>
  );
}

export default App;
