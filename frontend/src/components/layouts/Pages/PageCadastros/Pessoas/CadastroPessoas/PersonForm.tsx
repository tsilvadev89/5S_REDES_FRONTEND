import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Button,
  TextField,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import dayjs, { Dayjs } from 'dayjs';
import DateField from '../../ComponentesComuns/DateField';
import { Cliente } from '../../../../../../models/Cliente';
import { Funcionario } from '../../../../../../models/Funcionario';
import { Cargo } from '../../../../../../models/Cargo';
import axios from 'axios';

interface PersonFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Cliente | Funcionario) => void;
  onDelete: (id: number) => void;
  data: Cliente | Funcionario | null;
  isFuncionario?: boolean;
}

const PersonForm: React.FC<PersonFormProps> = ({ open, onClose, onSave, onDelete, data, isFuncionario = false }) => {
  const [formData, setFormData] = useState<Partial<Cliente & Funcionario>>({
    primeiro_nome: '',
    sobrenome: '',
    email: '',
    imagem_url: '',
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const [cargos, setCargos] = useState<Cargo[]>([]); // Lista de cargos para a seleção

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        primeiro_nome: '',
        sobrenome: '',
        email: '',
        imagem_url: '',
        cargo_id: isFuncionario ? 0 : undefined,
        data_contratacao: isFuncionario ? '' : undefined,
      });
    }
  }, [data, isFuncionario]);

  // Fetch para carregar cargos ao abrir o modal
  useEffect(() => {
    if (isFuncionario) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/cargos`)
        .then((response) => setCargos(response.data))
        .catch((error) => console.error('Erro ao buscar cargos:', error));
    }
  }, [isFuncionario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({ ...formData, data_contratacao: date ? date.format('YYYY-MM-DD') : '' });
  };

  const handleSubmit = () => {
    onSave(formData as Cliente | Funcionario);
  };

  const handleDeleteClick = () => {
    onDelete((data as Cliente | Funcionario)?.cliente_id || (data as Funcionario)?.funcionario_id!);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = `${formData.primeiro_nome} ${formData.sobrenome}\n${formData.email}`;
    navigator.clipboard.writeText(textToCopy).then(() => setCopySuccess(true));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {isMobile ? (
        <Card sx={{ padding: 2, boxShadow: 'none', borderRadius: 1 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1} mb={2}>
              <Avatar src={formData.imagem_url} sx={{ width: 56, height: 56 }} />
              <Typography variant="h6">
                {formData.primeiro_nome} {formData.sobrenome}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formData.email}
              </Typography>
              <IconButton aria-label="copy details" onClick={handleCopy}>
                <CopyAllIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Stack spacing={2} mt={2}>
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
                type="email"
              />
              {isFuncionario && (
                <FormControl fullWidth>
                  <InputLabel>Cargo</InputLabel>
                  <Select
                    name="cargo_id"
                    value={formData.cargo_id || ''}
                    onChange={handleChange}
                    fullWidth
                  >
                    {cargos.map((cargo) => (
                      <MenuItem key={cargo.cargo_id} value={cargo.cargo_id}>
                        {cargo.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {isFuncionario && (
                <DateField
                  label="Data de Contratação"
                  value={formData.data_contratacao ? dayjs(formData.data_contratacao, 'YYYY-MM-DD') : null}
                  onChange={handleDateChange}
                />
              )}
              <TextField
                label="URL da Imagem"
                name="imagem_url"
                value={formData.imagem_url || ''}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ flexDirection: 'column', gap: 1, paddingTop: 2 }}>
            <Stack direction="row" spacing={1} width="100%">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setConfirmUpdateOpen(true)}
                fullWidth
              >
                {data ? 'Atualizar' : 'Cadastrar'}
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => setConfirmDeleteOpen(true)}
                fullWidth
              >
                Excluir
              </Button>
            </Stack>
            <Button onClick={onClose} color="primary" fullWidth>
              Cancelar
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ padding: 3, boxShadow: 'none', borderRadius: 2 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Avatar src={formData.imagem_url} sx={{ width: 56, height: 56 }} />
              <Stack>
                <Typography variant="h6">
                  {formData.primeiro_nome} {formData.sobrenome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formData.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto' }}>
                <IconButton aria-label="copy details" onClick={handleCopy}>
                  <CopyAllIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Stack spacing={2} mt={2}>
              <Stack direction="row" spacing={2}>
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
              </Stack>
              <TextField
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                fullWidth
                type="email"
              />
              {isFuncionario && (
                <FormControl fullWidth>
                  <InputLabel>Cargo</InputLabel>
                  <Select
                    name="cargo_id"
                    value={formData.cargo_id || ''}
                    onChange={handleChange}
                  >
                    {cargos.map((cargo) => (
                      <MenuItem key={cargo.cargo_id} value={cargo.cargo_id}>
                        {cargo.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {isFuncionario && (
                <DateField
                  label="Data de Contratação"
                  value={formData.data_contratacao ? dayjs(formData.data_contratacao, 'YYYY-MM-DD') : null}
                  onChange={handleDateChange}
                />
              )}
              <TextField
                label="URL da Imagem"
                name="imagem_url"
                value={formData.imagem_url || ''}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'space-between', paddingTop: 2 }}>
            <Button startIcon={<DeleteIcon />} color="error" onClick={handleDeleteClick}>
              Excluir usuário
            </Button>
            <Stack direction="row" spacing={1}>
              <Button onClick={onClose} color="primary">Cancelar</Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {data ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}

      {/* Dialog para confirmar exclusão */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteClick} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para confirmar atualização */}
      <Dialog open={confirmUpdateOpen} onClose={() => setConfirmUpdateOpen(false)}>
        <DialogTitle>Confirmar Atualização</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja atualizar este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUpdateOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de feedback para a cópia */}
      <Snackbar open={copySuccess} autoHideDuration={3000} onClose={() => setCopySuccess(false)}>
        <Alert onClose={() => setCopySuccess(false)} severity="success">
          Detalhes copiados para a área de transferência!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default PersonForm;
