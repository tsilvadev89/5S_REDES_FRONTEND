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
} from '@mui/material';


interface UserTableUserProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
}

const UserTableUser: React.FC<UserTableUserProps> = ({ clientes, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Data de Nascimento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.cliente_id}
              onClick={() => onEdit(cliente)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={cliente.imagem_url} alt={cliente.primeiro_nome} />
              </TableCell>
              <TableCell>{`${cliente.primeiro_nome} ${cliente.sobrenome}`}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{new Date(cliente.data_nascimento).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTableUser;
