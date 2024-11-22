import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// Defina as cores de background para cada porta
const backgroundColors: Record<number, { default: string; paper: string }> = {
  8002: {
    default: "#D5D5D5",
    paper: "#edf2f4",
  },
  8003: {
    default: "#eff2f1",
    paper: "#ffeecf",
  },
};

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  // Obter porta e garantir fallback
  const rawPort = import.meta.env.VITE_FRONTEND_PORT;
  const port = parseInt(rawPort || "8001", 10);

  // Verificar se devemos usar tema customizado
  const shouldUseCustomTheme = backgroundColors.hasOwnProperty(port);

  // Logs para depuração
  console.log("Port from environment:", rawPort);
  console.log("Parsed port:", port);
  console.log("Use custom theme:", shouldUseCustomTheme);

  // Criar tema dinamicamente
  const theme = useMemo(() => {
    if (shouldUseCustomTheme) {
      const backgroundColor = backgroundColors[port];
      console.log("Using custom background colors:", backgroundColor);
      return createTheme({
        palette: {
          mode,
          background: {
            default: backgroundColor.default,
            paper: backgroundColor.paper,
          },
        },
      });
    }
    console.log("Using default Material-UI theme");
    return createTheme({ palette: { mode } });
  }, [mode, port]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
