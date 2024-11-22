import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// Defina as cores de background para cada porta
const backgroundColors = {
  8001: {
    default: "#ffffff", 
    paper: "#e5e5e5",   
  },
  8002: {
    default: "#D5D5D5",
    paper: "#edf2f4", 
  },
  8003: {
    default: "#eff2f1",
    paper: "#ffeecf", 
  },
} as const;

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

  // Obtenha a porta e garanta um fallback
  const port = parseInt(import.meta.env.VITE_FRONTEND_PORT || "8001", 10);
  const backgroundColor = backgroundColors[port as keyof typeof backgroundColors] || backgroundColors[8001];

  // Log para depuração
  console.log("Current mode:", mode);
  console.log("Environment port:", import.meta.env.VITE_FRONTEND_PORT);
  console.log("Parsed port:", port);
  console.log("Background color:", backgroundColor);

  if (!backgroundColor) {
    console.error(`No background color configuration found for port: ${port}`);
  }

  // Criação de tema com base no modo e na cor de background
  const theme = useMemo(() => {
    const createdTheme = createTheme({
      palette: {
        mode,
        background: {
          default: backgroundColor.default,
          paper: backgroundColor.paper,
        },
      },
    });
    console.log("Created theme:", createdTheme); // Log do tema criado
    return createdTheme;
  }, [mode, backgroundColor]);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      console.log("Toggled mode to:", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
