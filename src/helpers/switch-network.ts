import { getMainnetURI } from "./get-mainnet-uri";

const switchRequest = () => {
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x2328" }],
  });
};

const addChainRequest = () => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x2328",
        chainName: "EVMOS Testnet",
        rpcUrls: [getMainnetURI()],
        blockExplorerUrls: ["https://evm.evmos.dev"],
        nativeCurrency: {
          name: "EVMOS",
          symbol: "EVMOS",
          decimals: 18,
        },
      },
    ],
  });
};

export const swithNetwork = async () => {
  if (window.ethereum) {
    try {
      await switchRequest();
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await addChainRequest();
          await switchRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
