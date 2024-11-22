import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// Defina as cores primárias para cada porta
const primaryColors = {
  8001: {
    main: "#1976d2",
    light: "#63a4ff",
    dark: "#115293",
  },
  8002: {
    main: "#d32f2f",
    light: "#ff6659",
    dark: "#9a0007",
  },
  8003: {
    main: "#388e3c",
    light: "#66bb6a",
    dark: "#1b5e20",
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
  const primaryColor = primaryColors[port as keyof typeof primaryColors] || primaryColors[8001];

  // Log para depuração
  console.log("Current mode:", mode);
  console.log("Environment port:", import.meta.env.VITE_FRONTEND_PORT);
  console.log("Parsed port:", port);
  console.log("Primary color:", primaryColor);

  if (!primaryColor) {
    console.error(`No primary color configuration found for port: ${port}`);
  }

  // Criação de tema com base no modo e na cor primária
  const theme = useMemo(() => {
    const createdTheme = createTheme({
      palette: {
        mode,
        primary: {
          main: primaryColor.main,
          light: primaryColor.light,
          dark: primaryColor.dark,
        },
      },
    });
    console.log("Created theme:", createdTheme); // Log do tema criado
    return createdTheme;
  }, [mode, primaryColor]);

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
