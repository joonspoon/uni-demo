import { ethers } from "ethers";

export function getPrivateKeyFromSeedPhrase(mnemonic){
  let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  return mnemonicWallet.privateKey;
}

export async function sendEther(wallet): Promise<string> {
let wallet2 = new ethers.Wallet(wallet.keys.ethereumKey);
let walletSigner = wallet2.connect(rinkebyProvider);
const tx = await walletSigner.sendTransaction({
    to: proxyContractAddress,
    value: ethers.utils.parseEther(".0001")
  });
  //console.log({ ether, addr });
  console.log("tx", tx);
}


export async function getContractBalance(): Promise<string> {
  const proxyContractInterface = [
    "function getContractBalance() public view returns (uint256)"
  ];
  const contract = new ethers.Contract(proxyContractAddress, proxyContractInterface, rinkebyProvider);

  const balance:BigNumber = await contract.getContractBalance();
  console.log("contract balance: " + ethers.utils.formatEther(balance));
  return balance.toString();
}
