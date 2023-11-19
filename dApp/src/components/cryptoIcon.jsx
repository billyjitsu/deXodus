import Image from "next/image";

export const CryptoIcon = ({ market = 1, size = "md" }) => {
  const sizes = {
    md: "22px",
    sm: "18px",
  };

  if (market == 1) {
    return (
      <div className="group flex items-center">
        <Image
          src="/images/crypto_logos/bitcoin-btc-logo-40.png"
          width="40"
          height="40"
          style={{ width: sizes[size], height: sizes[size] }}
          alt="BTC logo"
        />
        <span
          className={`text-white ml-1 font-semibold text-${size} group-hover:text-[#1B998B]`}
        >
          BTC
        </span>
      </div>
    );
  } else if (market == 2) {
    return (
      <div className="group flex items-center">
        <Image
          src="/images/crypto_logos/ethereum-eth-logo-40.png"
          width="40"
          height="40"
          style={{ width: sizes[size], height: sizes[size] }}
          alt="ETH logo"
        />
        <span
          className={`text-white ml-1 font-semibold text-${size} group-hover:text-[#1B998B]`}
        >
          ETH
        </span>
      </div>
    );
  }
};
