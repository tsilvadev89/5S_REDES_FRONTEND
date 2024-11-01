import { useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CadastradorCliente from '../cadastradores/cadastradorCliente';


interface PropsFormularioCadastro {
  onRefresh(): void;
}

const FormularioCadastroCliente:React.FC<PropsFormularioCadastro> = ({onRefresh}) => {
  const [nome, setNome] = useState('');
  const [sobreNome, setSobreNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState({
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    codigoPostal: '',
    informacoesAdicionais: '',
  });
  const [telefone, setTelefone] = useState({
    ddd: '',
    numero: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cliente = {
      nome,
      sobreNome,
      email,
      endereco,
      telefones: [telefone],
    };


    const cadastrador = new CadastradorCliente();


    cadastrador.cadastrar(cliente);

    console.log('Cliente cadastrado:', cliente);
    onRefresh();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ padding: '20px' }}>
          <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} variant="outlined" fullWidth />
          <TextField label="Sobrenome" value={sobreNome} onChange={(e) => setSobreNome(e.target.value)} variant="outlined" fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth />

          {/* Campos de Endereço */}
          <TextField label="Estado" value={endereco.estado} onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Cidade" value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Bairro" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Rua" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Número" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Código Postal" value={endereco.codigoPostal} onChange={(e) => setEndereco({ ...endereco, codigoPostal: e.target.value })} variant="outlined" fullWidth />
          <TextField
            label="Informações Adicionais"
            value={endereco.informacoesAdicionais}
            onChange={(e) => setEndereco({ ...endereco, informacoesAdicionais: e.target.value })}
            variant="outlined"
            fullWidth
          />

          {/* Campos de Telefone */}
          <TextField label="Telefone DDD" value={telefone.ddd} onChange={(e) => setTelefone({ ...telefone, ddd: e.target.value })} variant="outlined" fullWidth />
          <TextField label="Número" value={telefone.numero} onChange={(e) => setTelefone({ ...telefone, numero: e.target.value })} variant="outlined" fullWidth />

          <Stack direction="row" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Cliente
              <Send sx={{ marginLeft: '10px' }} />
            </Button>
            <Link to="/">
              <Button variant="contained" color="primary">
                Voltar
                <ArrowBack sx={{ marginLeft: '10px' }} />
              </Button>
            </Link>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default FormularioCadastroCliente;
