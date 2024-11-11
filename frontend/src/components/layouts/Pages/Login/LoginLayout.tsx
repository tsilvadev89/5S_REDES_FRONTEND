import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Link, Snackbar, Stack } from '@mui/material';
import InputField from './InputField';
import Checkbox from './Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import FundoImg from '../../../../assets/Login/LoginImage.png';
import { authService } from '../../../../services/authService ';
import { z } from 'zod';

const LoginLayout: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const loginSchema = z.object({
    email: z.string().email('Por favor, insira um e-mail válido'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  const handleLogin = async () => {
    try {
      // Validar os dados usando zod
      loginSchema.parse({ email, senha: password });

      // Chama o serviço de login
      const { token } = await authService.login(email, password);

      // Armazena o token no localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ email, tipo: 'cliente' }));

      // Redireciona ou exibe mensagem de sucesso
      window.location.href = '/home'; // Exemplo de redirecionamento após login bem-sucedido
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message); // Mostra a primeira mensagem de erro do zod
      } else {
        setError('Email ou senha incorretos'); // Exibe erro genérico
      }
      setOpenSnackbar(true); // Abre o snackbar com a mensagem de erro
    }
  };

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Contêiner principal com duas colunas */}
      <Box
        display="flex"
        flexDirection="row"
        bgcolor="#fff"
        borderRadius={2}
        boxShadow={3}
        overflow="hidden"
        sx={{
          width: { xs: '450px', md: '900px' },
          height: { xs: '100%', md: '80%' },
        }}
      >
        {/* Coluna do formulário */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: '450px', md: '50%' },
            padding: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            BEM VINDO
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sistema controle salão beleza
          </Typography>

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Senha"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Mensagem de erro */}
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
            <Checkbox label="Relembrar" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <Link href="#" underline="hover">
              Esqueci Senha
            </Link>
          </Box>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: 2, paddingY: 1.5 }}
          >
            Login
          </Button>

          <Divider sx={{ width: '100%', marginY: 2 }}>ou</Divider>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{ color: '#555', borderColor: '#555', paddingY: 1.5 }}
          >
            Entre com Google
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            Não possui conta?{' '}
            <Link href="#" underline="hover" color="error">
              Cadastre aqui!
            </Link>
          </Typography>
        </Box>

        {/* Coluna da Imagem */}
        <Box
          display={{ xs: 'none', md: 'flex' }}
          width="50%"
          height="100%"
          sx={{
            backgroundImage: `url(${FundoImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>

      {/* Snackbar para mostrar mensagens de erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={error}
      />
    </Box>
  );
};

export default LoginLayout;
