import React, { useEffect, useState } from 'react';
import { Cliente } from '../../../../../../models/Cliente';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import DateField from '../../ComponentesComuns/DateField';

interface PersonFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
  cliente: Cliente | null;
}

const PersonForm: React.FC<PersonFormProps> = ({ open, onClose, onSave, cliente }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    primeiro_nome: '',
    sobrenome: '',
    email: '',
    data_nascimento: '',
    imagem_url: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        primeiro_nome: '',
        sobrenome: '',
        email: '',
        data_nascimento: '',
        imagem_url: '',
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null, field: 'data_nascimento') => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setFormData({ ...formData, [field]: formattedDate });
  };

  const handleSubmit = () => {
    onSave(formData as Cliente);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{cliente ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="primeiro_nome"
            value={formData.primeiro_nome || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Sobrenome"
            name="sobrenome"
            value={formData.sobrenome || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            fullWidth
          />
          <DateField
            label="Data de Nascimento"
            value={formData.data_nascimento ? dayjs(formData.data_nascimento, 'YYYY-MM-DD') : null}
            onChange={(date) => handleDateChange(date, 'data_nascimento')}
          />
          <TextField
            label="URL da Imagem"
            name="imagem_url"
            value={formData.imagem_url || ''}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {cliente ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonForm;
