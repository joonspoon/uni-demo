pragma solidity ^0.6.6;

import './interfaces/ILiquidityValueCalculator.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    constructor(address factory_) public {
        factory = factory_;
    }

    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
        // Look up the pair address
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));

        // Get the total supply of the pair liquidity
        totalSupply = pair.totalSupply();

        // Get the reserves of the pair
        (uint reserves0, uint reserves1,) = pair.getReserves();

        // Sort the reserves in the order of tokenA, tokenB
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
    }

    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external override returns (uint tokenAAmount, uint tokenBAmount) {
        revert('TODO');
    }
}
