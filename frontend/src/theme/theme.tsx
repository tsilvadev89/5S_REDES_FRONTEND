import { PaletteMode } from "@mui/material";

// Defina as cores primárias para cada porta
const primaryColors = {
  8001: {
    main: '#1976d2', // Azul para porta 8001
  },
  8002: {
    main: '#d32f2f', // Vermelho para porta 8002
  },
  8003: {
    main: '#388e3c', // Verde para porta 8003
  },
} as const; // Usar 'as const' para garantir que o objeto seja tratado como um literal

// Defina um tipo para as portas
type Port = keyof typeof primaryColors;

export const getDesignTokens = (mode: PaletteMode) => {
  // Acesse a variável de ambiente para a porta
  const port = import.meta.env.VITE_FRONTEND_PORT as Port; // Assegure-se de que 'port' é do tipo 'Port'

  // Determine a cor primária com base na porta
  const primaryColor = primaryColors[port] || primaryColors[8001]; // Fallback para 8001 se a porta não for reconhecida

  return {
    palette: {
      mode,
      primary: primaryColor,
    },
  };
};

export default getDesignTokens;
