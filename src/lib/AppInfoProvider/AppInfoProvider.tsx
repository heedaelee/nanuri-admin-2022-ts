import React, { Children, createContext, useState } from "react";

interface AppInfoProviderProps {
  children: React.ReactElement | Array<React.ReactElement>;
}

const defaultContext: AppInfoContextType = {
  message: "",
  setMessage: (active: string) => {},
  loading: false,
  setLoading: (active: boolean) => {},
  error: "",
  setError: (active: string) => {},
};

const AppInfoContext = createContext(defaultContext);

const AppInfoProvider = ({ children }: AppInfoProviderProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <AppInfoContext.Provider
      value={{
        message,
        setMessage,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AppInfoContext.Provider>
  );
};

export { AppInfoProvider, AppInfoContext };
