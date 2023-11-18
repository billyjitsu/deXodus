import React, { createContext, useContext, useState } from "react";

const PriceContext = createContext();

export function usePrice() {
  return useContext(PriceContext);
}

export function PriceProvider({ children }) {
  const [price, setPrice] = useState({
    1: null,
    2: null,
  });

  const setPriceData = (newPrice) => {
    setPrice((prevPrice) => ({
      ...prevPrice,
      ...newPrice,
    }));
  };

  const getPriceByMarket = (id) => {
    return price[id];
  };

  return (
    <PriceContext.Provider value={{ price, setPriceData, getPriceByMarket }}>
      {children}
    </PriceContext.Provider>
  );
}
