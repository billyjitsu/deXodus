import React, { createContext, useContext, useState } from "react";

const DeploymentContext = createContext();

export function useDeployment() {
  return useContext(DeploymentContext);
}

export function DeploymentProvider({ children }) {
  const [deployment, setDeployment] = useState({
    futures: null,
    liquidity: null,
    price: null,
    usdc: null,
    chest: null,
  });

  const setDeploymentData = (newDeployment) => {
    setDeployment((prevDeployment) => ({
      ...prevDeployment,
      ...newDeployment,
    }));
  };

  const getDeploymentAddress = (name) => {
    return deployment[name];
  };

  return (
    <DeploymentContext.Provider value={{ deployment, setDeploymentData, getDeploymentAddress }}>
      {children}
    </DeploymentContext.Provider>
  );
}
