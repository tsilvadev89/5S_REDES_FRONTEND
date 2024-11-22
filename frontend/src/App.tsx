import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";

import { BrowserRouter as Router } from 'react-router-dom'; // Corrigido para usar o Router certo
import RoutesConfig from "./Routes/RoutesConfig";

import { TemplateProvider, useTemplate } from "./theme/Template";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const { theme } = useThemeContext();
  const { template } = useTemplate();

 
  const basePath = import.meta.env.VITE_BASE_PATH_FRONTEND || "/"; // Use "/" como padrão se não houver variável

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router basename={basePath}>
        <ThemeProvider theme={theme}>
          <TemplateProvider template={template}>
            <RoutesConfig />
            <CssBaseline />
          </TemplateProvider>
        </ThemeProvider>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
