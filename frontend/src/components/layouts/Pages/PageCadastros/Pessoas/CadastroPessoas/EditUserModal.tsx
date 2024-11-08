import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Avatar } from '@mui/material';
import { Cliente } from '../../../../../../models/Cliente';

interface EditUserModalProps {
  user: Cliente;
  open: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center" mb={2}>
          <Avatar src={formData.imagem_url} sx={{ width: 80, height: 80 }} />
        </Stack>
        <TextField
          label="First Name"
          name="primeiro_nome"
          value={formData.primeiro_nome || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Last Name"
          name="sobrenome"
          value={formData.sobrenome || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
          type="email"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
