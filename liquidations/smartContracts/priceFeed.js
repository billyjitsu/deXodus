const priceFeedABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "previousAdmin",
        type: "address",
        indexed: false,
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
        indexed: false,
      },
    ],
    type: "event",
    name: "AdminChanged",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beacon",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "BeaconUpgraded",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
        indexed: false,
      },
    ],
    type: "event",
    name: "Initialized",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "previousOwner",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "OwnershipTransferStarted",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "previousOwner",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "OwnershipTransferred",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "Upgraded",
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "USDC",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "function",
    name: "acceptOwnership",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_uniswapPool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "addOrUpdateTokenSupport",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "getUsdPriceFromAmm",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "getUsdPriceFromChainlink",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_uniswapPool",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_priceFeed",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_wbtc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "initialize",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_futureId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_entryPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_percentAllowed",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_long",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "isAcceptablePrice",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_futureId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_entryPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "isAcceptablePrice",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "mockChangePrice",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "mockGetUsdPriceFromChainlink",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proxyAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "readDataFeedFromApi3",
    outputs: [
      {
        internalType: "uint224",
        name: "",
        type: "uint224",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "function",
    name: "renounceOwnership",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "s_tokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "priceFeed",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "s_tokenPriceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "priceFeed",
        type: "address",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "s_uniswapTokenPool",
    outputs: [
      {
        internalType: "contract IUniswapV3Pool",
        name: "tokenUsdPool",
        type: "address",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "transferOwnership",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "upgradeTo",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
    name: "upgradeToAndCall",
  },
  {
    inputs: [],
    stateMutability: "pure",
    type: "function",
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "wbtc",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "weth",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
];

module.exports = {
  priceFeedABI,
};