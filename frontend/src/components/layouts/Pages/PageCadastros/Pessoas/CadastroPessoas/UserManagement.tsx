import React, { useState, useEffect } from 'react';
import { clienteService } from '../../../../../../services/clienteService';
import { Cliente } from '../../../../../../models/Cliente';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import UserTable from './UserTable';
import UserCardList from './UserCardList';
import PersonForm from './PersonForm';

const UserManagement: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => {});
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchClientes = async () => {
    try {
      const response = await clienteService.getAllClientes();
      setClientes(response);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleCreate = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const confirmAction = (action: () => void, message: string) => {
    setConfirmationAction(() => action);
    setConfirmationMessage(message);
    setConfirmationOpen(true);
  };

  const handleDelete = (clienteId: number) => {
    const cliente = clientes.find(c => c.cliente_id === clienteId);
    const clienteNome = cliente ? `${cliente.primeiro_nome} ${cliente.sobrenome}` : 'Cliente';
  
    confirmAction(async () => {
      try {
        await clienteService.deleteCliente(clienteId);
        setSuccess(true);
        fetchClientes();
      } catch (error) {
        setError('Erro ao excluir cliente.');
      }
    }, `Tem certeza que deseja excluir o cliente ${clienteNome}?`);
  };

  const handleSave = (cliente: Cliente) => {
    const actionType = cliente.cliente_id ? 'atualizar' : 'cadastrar';
    const clienteNome = `${cliente.primeiro_nome} ${cliente.sobrenome}`;
    confirmAction(async () => {
      try {
        if (cliente.cliente_id) {
          await clienteService.updateCliente(cliente.cliente_id, cliente);
        } else {
          await clienteService.createCliente(cliente);
        }
        setSuccess(true);
        fetchClientes();
        setIsModalOpen(false);
      } catch (error) {
        setError('Erro ao salvar cliente.');
      }
    }, `Tem certeza que deseja ${actionType} o cliente ${clienteNome}?`);
  };

  const handleConfirm = () => {
    confirmationAction();
    setConfirmationOpen(false);
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de Clientes</Typography>
      <Button variant="contained" onClick={handleCreate}>
        Novo Cliente
      </Button>
      {isMobile ? (
        <UserCardList clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <UserTable clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <PersonForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        cliente={selectedCliente}
      />
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Operação realizada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      
      {/* Dialog de Confirmação */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {confirmationMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default UserManagement;
