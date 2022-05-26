import React, {createContext, useContext} from 'react';
import { defaultTheme } from './defaultConfig';

export interface ThemeData {
  theme: any;
}

export const ThemeContext = createContext<ThemeData>({
  theme: defaultTheme.theme,
});

export const useThemeContext = () => useContext(ThemeContext);
