import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

import DeleteIcon from '@mui/icons-material/Delete';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Categoria } from '../../../../../models/Categoria';
import { useState, useEffect } from 'react';


interface CategoriaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
  categoria: Categoria | null;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({ open, onClose, onSave, onDelete, categoria }) => {
  const [formData, setFormData] = useState<Partial<Categoria>>({
    nome: '',
    descricao: '',
    tipo: 'Serviço', // Padrão para selecionar entre "Serviço" ou "Produto"
    imagem_url: '',
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const botaoTexto = categoria ? 'Atualizar' : 'Cadastrar';

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    } else {
      setFormData({
        nome: '',
        descricao: '',
        tipo: 'Serviço',
        imagem_url: '',
      });
    }
  }, [categoria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setConfirmUpdateOpen(false);
    onSave(formData as Categoria);
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(false);
    onDelete(categoria?.categoria_id!);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = `${formData.nome}\nDescrição: ${formData.descricao}\nTipo: ${formData.tipo}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={2}>
              <Avatar src={formData.imagem_url} sx={{ width: 56, height: 56 }} />
              <Typography variant="h6">{formData.nome}</Typography>
              <IconButton onClick={handleCopy}>
                <CopyAllIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} mt={2}>
              <TextField label="Nome" name="nome" value={formData.nome || ''} onChange={handleChange} fullWidth />
              <TextField label="Descrição" name="descricao" value={formData.descricao || ''} onChange={handleChange} fullWidth multiline rows={3} />
              <TextField
                select
                label="Tipo"
                name="tipo"
                value={formData.tipo || ''}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Serviço">Serviço</MenuItem>
                <MenuItem value="Produto">Produto</MenuItem>
              </TextField>
              <TextField label="URL da Imagem" name="imagem_url" value={formData.imagem_url || ''} onChange={handleChange} fullWidth />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack flexDirection={'column'} gap={2} alignItems={'center'} width={'100%'}>
              <Button variant="contained" color="primary" onClick={() => setConfirmUpdateOpen(true)}>
                {botaoTexto}
              </Button>
              {categoria && (
                <Button startIcon={<DeleteIcon />} color="error" onClick={() => setConfirmDeleteOpen(true)}>
                  Excluir
                </Button>
              )}
              <Button onClick={onClose}>Cancelar</Button>
            </Stack>
          </CardActions>
        </Card>
      </DialogContent>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir <strong>{formData.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteClick} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmUpdateOpen} onClose={() => setConfirmUpdateOpen(false)}>
        <DialogTitle>Confirmar {categoria ? 'Atualização' : 'Cadastro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja {categoria ? 'atualizar' : 'cadastrar'} <strong>{formData.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUpdateOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{botaoTexto}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={copySuccess} autoHideDuration={3000} onClose={() => setCopySuccess(false)}>
        <Alert onClose={() => setCopySuccess(false)} severity="success">
          Detalhes copiados para a área de transferência!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default CategoriaForm;
