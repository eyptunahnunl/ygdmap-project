import { createContext, useState } from "react";

const LocationAnalysisContext = createContext({});

export const LocationAnalysisProvider = ({ children }) => {
  const [apiData, setApiData] = useState();

  const data = {
    apiData,
    setApiData,
  };

  return (
    <LocationAnalysisContext.Provider value={data}>
      {children}
    </LocationAnalysisContext.Provider>
  );
};

export default LocationAnalysisContext;
