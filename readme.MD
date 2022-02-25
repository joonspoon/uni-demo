# 🦄🦄🦄 
This code uses the Uniswap SDK to perform a basic swap from ETH to UNI using the Uniswap V2 Router.
The router automatically wraps ETH as ERC-20 so that it can be traded on Uniswap.

```
git clone https://github.com/joonspoon/uni-demo
cd uni-demo
npm install
```

## Requirements:
* Some ETH for testing that you can get from the Chainlink faucet: https://faucets.chain.link/rinkeby
* Fill in the wallet private key. Can be generated from seed phrase using `utils.js`

## To run swaps:
```
yarn run swap
```
