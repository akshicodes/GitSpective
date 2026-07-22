import { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [analytics, setAnalytics] = useState(null);

  return (
    <AnalyticsContext.Provider value={{ analytics, setAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}