// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface ILiquidityPool {
    function blockLiquidity(uint256 _amount) external;

    function unblockLiquidity(uint256 _amount) external;
}