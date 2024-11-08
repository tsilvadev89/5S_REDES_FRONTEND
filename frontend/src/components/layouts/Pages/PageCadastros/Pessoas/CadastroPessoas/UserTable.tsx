import React from 'react';
import { Cliente } from '../../../../../../models/Cliente';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserTableProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (clienteId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ clientes, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Data de Nascimento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.cliente_id}>
              <TableCell>
                <Avatar src={cliente.imagem_url} alt={cliente.primeiro_nome} />
              </TableCell>
              <TableCell>{`${cliente.primeiro_nome} ${cliente.sobrenome}`}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{new Date(cliente.data_nascimento).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(cliente)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(cliente.cliente_id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
