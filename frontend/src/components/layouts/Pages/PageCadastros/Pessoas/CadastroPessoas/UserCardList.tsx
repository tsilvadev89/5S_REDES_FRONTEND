import React from 'react';
import { Cliente } from '../../../../../../models/Cliente';
import { Card, CardContent, CardActions, Typography, Avatar, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserCardListProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (clienteId: number) => void;
}

const UserCardList: React.FC<UserCardListProps> = ({ clientes, onEdit, onDelete }) => {
  return (
    <Stack spacing={2}>
      {clientes.map((cliente) => (
        <Card key={cliente.cliente_id} variant="outlined">
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={cliente.imagem_url} alt={cliente.primeiro_nome} />
              <div>
                <Typography variant="h6">
                  {cliente.primeiro_nome} {cliente.sobrenome}
                </Typography>
                <Typography color="textSecondary">{cliente.email}</Typography>
                <Typography color="textSecondary">
                  Data de Nascimento: {new Date(cliente.data_nascimento).toLocaleDateString()}
                </Typography>
              </div>
            </Stack>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => onEdit(cliente)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(cliente.cliente_id)} color="error">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};

export default UserCardList;
