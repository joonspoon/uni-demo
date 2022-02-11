import { ChainId, Token,  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType, Pair } from "@uniswap/sdk";
import { ethers } from "ethers";

const chainId = ChainId.RINKEBY;
console.log(`The chainId of RINKEBY is ${chainId}.`);

// const DAI = new Token(
//   ChainId.RINKEBY,
//   "0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658",
//   18,
//   "DAI",
//   "DAI Stablecoin"
// );
const UNI = new Token(
  chainId,
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  18,
  "UNI",
  "UNI"
);
//const UNI = await Fetcher.fetchTokenData(chainId, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");


const pair = await Fetcher.fetchPairData(UNI, WETH[UNI.chainId]);

const route = new Route([pair], WETH[UNI.chainId]);

const amountIn = "1000000000000000000"; // 1 WETH
//const amountIn = ethers.utils.parseEther("0.1");

const trade = new Trade(
  route,
  new TokenAmount(WETH[UNI.chainId], amountIn),
  TradeType.EXACT_INPUT
);

import { Percent } from "@uniswap/sdk";

const slippageTolerance = new Percent("50", "10000"); // 50 bips, or 0.50%

const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
const path = [WETH[UNI.chainId].address, UNI.address];
const to = "0x0c74caff031c9cefbbcdf84ed5363f928078da51"; // should be a checksummed recipient address
const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex

import fs from 'fs';
const uniswapRouterContract = JSON.parse(fs.readFileSync('./build/contracts/uniswap-router.json', 'utf8'));
const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const rinkebyProvider = ethers.providers.getDefaultProvider('rinkeby');
const privateKey = "ecec553b70043b611e297bebd1a1bf86d055118495b3061cd5607761702d4cec"; // do not disclose the private key
const ethersWallet = new ethers.Wallet(privateKey, rinkebyProvider);
const uniswap = new ethers.Contract(uniswapRouterAddress, uniswapRouterContract.abi, ethersWallet);

const ethAmount = ethers.utils.parseEther("0.01");

const tx = await uniswap.swapExactETHForTokens(
    0,
    path,
    to,
    deadline,
    {
        gasLimit: 1000000,
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        value: ethAmount
    }
  );

// Need additional code to use this function. Uniswap router contract must be approved to spend WETH.
// const tx = await uniswap.swapExactTokensForTokens(
//         amountIn,
//         0,
//         path,
//         to,
//         deadline,
//         {
//             gasLimit: 1000000,
//             gasPrice: ethers.utils.parseUnits("10", "gwei"),
//         }
//     );

const { hash } = tx;
const transactionURL = "https://rinkeby.etherscan.io/tx/" + hash;
console.log("Transaction is pending at " + transactionURL);

const swapResult = await tx.wait();
console.log(swapResult)
