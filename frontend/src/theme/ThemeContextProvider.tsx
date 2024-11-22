import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// Defina as cores de background para cada porta, sem incluir 8001
const backgroundColors = {
  8002: {
    default: "#ffffff", // Fundo claro
    paper: "#e5e5e5",   // Fundo para papéis ou cartões
  },
  8003: {
    default: "#eff2f1", // Fundo esverdeado
    paper: "#ffeecf",   // Fundo amarelado
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

  // Obtenha a porta da configuração do ambiente
  const port = parseInt(import.meta.env.VITE_FRONTEND_PORT || "8001", 10);

  // Determine a cor de fundo com base na porta
  const backgroundColor = backgroundColors[port as keyof typeof backgroundColors];

  // Log para depuração
  console.log("Current mode:", mode);
  console.log("Environment port:", import.meta.env.VITE_FRONTEND_PORT);
  console.log("Parsed port:", port);
  console.log("Background color:", backgroundColor || "Default Material-UI Theme");

  // Criação do tema com base no modo
  const theme = useMemo(() => {
    // Se a porta for 8001, use o tema padrão do Material-UI
    if (port === 8001) {
      console.log("Using default Material-UI theme for port 8001.");
      return createTheme({
        palette: {
          mode,
        },
      });
    }

    // Caso contrário, aplique as cores customizadas
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
  }, [mode, backgroundColor, port]);

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
