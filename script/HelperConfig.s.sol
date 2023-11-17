// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    NetworkConfig public activeNetworkConfig;

    struct NetworkConfig {
        address weth;
        address wbtc;
        address usdc;
        uint256 deployerKey;
    }

    constructor() {
        uint256 id;
        assembly {
            id := chainid()
        }
        if (id == 421613) {
            activeNetworkConfig = getArbitrumGoerliConfig();
        } else if (id == 421614) {
            activeNetworkConfig = getArbitrumSepoliaConfig();
        } else if (id == 11155111) {
            activeNetworkConfig = getEthereumSepoliaConfig();
        } else {
            activeNetworkConfig = getEthereumMainnetForkConfig();
        }
    }

    function getEthereumMainnetForkConfig()
        public
        view
        returns (NetworkConfig memory arbitrumGoerliNetworkConfig)
    {
        arbitrumGoerliNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419, // ETH / USD
            wbtcUsdPriceFeed: 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c,
            weth: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
            wbtc: 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599,
            usdc: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    function getEthereumSepoliaConfig()
        public
        view
        returns (NetworkConfig memory arbitrumGoerliNetworkConfig)
    {
        arbitrumGoerliNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306, // ETH / USD
            wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
            weth: 0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa,
            wbtc: 0xFF82bB6DB46Ad45F017e2Dfb478102C7671B13b3,
            usdc: 0x51fCe89b9f6D4c530698f181167043e1bB4abf89,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    function getArbitrumGoerliConfig()
        public
        view
        returns (NetworkConfig memory arbitrumGoerliNetworkConfig)
    {
        arbitrumGoerliNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: 0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08, // ETH / USD
            wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
            weth: 0xF4e3B0de5021d400A3D2F4A5F286593D447d7569,
            wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
            usdc: 0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    function getArbitrumSepoliaConfig()
        public
        view
        returns (NetworkConfig memory arbitrumGoerliNetworkConfig)
    {
        arbitrumGoerliNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: 0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08, // ETH / USD
            wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
            weth: 0x980B62Da83eFf3D4576C647993b0c1D7faf17c73,
            wbtc: 0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7,
            usdc: 0x6402c4c08C1F752Ac8c91beEAF226018ec1a27f2,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }
}