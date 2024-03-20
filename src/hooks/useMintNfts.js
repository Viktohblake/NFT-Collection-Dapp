import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { ethers } from "ethers";
import { getProvider } from "../constants/providers";
import { mintNFT } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useMintNFT = (id) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return toast.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const estimatedGas = ethers.parseUnits("0.01", 18);

    const contract = mintNFT(signer);

    try {
      const transaction = await contract.safeMint(signer.address, id, {
        value: estimatedGas,
      });

      console.log("transaction: ", transaction);

      const receipt = await transaction.wait();
      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("minting successful!");
      }

      toast.error("minting failed!");
    } catch (error) {
      console.error("error: ", error);
    }
  }, [id, chainId, walletProvider]);
};

export default useMintNFT;