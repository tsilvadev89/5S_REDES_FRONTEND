import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";

import { BrowserRouter as Router, Routes } from 'react-router-dom';
import RoutesConfig from "./Routes/RoutesConfig";

import { TemplateProvider, useTemplate } from "./theme/Template";

function App() {
  const { theme } = useThemeContext();
  const { template } = useTemplate();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TemplateProvider template={template}>
          <Routes />
          <CssBaseline />
          <RoutesConfig />
        </TemplateProvider>
      </ThemeProvider>

    </Router>
  );
}

export default App;
