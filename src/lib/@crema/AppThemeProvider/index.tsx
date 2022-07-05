import React, { ReactElement } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "../../ThemeContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface AppThemeProviderProps {
  children: ReactElement;
}

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AppThemeProvider;
