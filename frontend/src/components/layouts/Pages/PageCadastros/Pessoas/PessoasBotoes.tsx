import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, IconButton, Tooltip, Stack } from '@mui/material';
import { ListAlt, Add, Delete } from '@mui/icons-material';

const ClientCRUDComponent = () => {
  const navigate = useNavigate();

  const handleList = () => {
    navigate('/pagelistarcliente');
  };

  const handleCreate = () => {
    navigate('/cadastropessoas');
  };

  const handleDelete = () => {
    navigate('/pageexcluircliente');
  };

  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Tooltip title="Cadastrar Cliente" placement="top">
          <IconButton color="primary" onClick={handleCreate}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Listar Clientes" placement="top">
          <IconButton color="primary" onClick={handleList}>
            <ListAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir Cliente" placement="top">
          <IconButton color="secondary" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </Container>
  );
};

export default ClientCRUDComponent;
