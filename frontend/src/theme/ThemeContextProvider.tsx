import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// Defina as cores primárias para cada porta
const primaryColors = {
  8001: {
    main: '#1976d2',
    light: '#63a4ff',
    dark: '#115293',
  },
  8002: {
    main: '#d32f2f',
    light: '#ff6659',
    dark: '#9a0007',
  },
  8003: {
    main: '#388e3c',
    light: '#66bb6a',
    dark: '#1b5e20',
  },
} as const; // Usar 'as const' para garantir que o objeto seja tratado como um literal

type ThemeContextType = {
  mode: PaletteMode; // Altere o tipo para PaletteMode
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  // Estado para controlar o modo de cor
  const [mode, setMode] = useState<PaletteMode>("light"); // Altere o tipo para PaletteMode

  // Acesse a porta da variável de ambiente
  const port = (import.meta.env.VITE_FRONTEND_PORT as keyof typeof primaryColors) || '8001'; // Padrão para 8001
  const primaryColor = primaryColors[port]; // Obtenha a cor primária com base na porta

  // Log das variáveis
  console.log("Current mode:", mode);
  console.log("Current port:", port);
  console.log("Primary color:", primaryColor);

  // Crie o tema com base na cor primária e no modo
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode, // Use o estado do modo
        primary: primaryColor,
      },
    });
  }, [mode, port]); // Dependências do modo e da porta para atualizar o tema se mudar

  // Função para alternar o modo de cor
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      console.log("Toggled mode to:", newMode); // Log da mudança de modo
      return newMode;
    });
  };

  // Defina o valor do contexto
  const value = { mode, toggleColorMode, theme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
