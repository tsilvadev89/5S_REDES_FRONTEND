import React, { useState, useEffect } from 'react';
import { Stack, TextField, Button, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import UpdateCliente from '../cadastradores/updateCliente';
import { Cliente } from '../../layouts/Pages/PageCadastros/Pessoas/tipagemClientes';

interface PropsFormularioEdicao {
  id: number;
  onRefresh(): void;
  onLoad: number;
  objetoCliente: Cliente[];
}

const FormularioEdicaoCliente: React.FC<PropsFormularioEdicao> = ({ id, onRefresh, onLoad, objetoCliente }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    sobreNome: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: '',
      id: 0,
      links: [],
    },
    telefones: [],
    links: [],
  });

  async function buscar() {
    try {
      const resposta = await fetch('http://localhost:32832/clientes');
      const json: Cliente[] = await resposta.json();

      setClientes(json);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
    filtrar;
  }

  const filtrar = () => {
    const clienteFiltrado = clientes.find((c) => c.id === id);
    if (clienteFiltrado) {
      setCliente(clienteFiltrado);
    } else {
      console.error('Cliente não encontrado');
    }
  };




 /*  useEffect(() => {
    const fetchData = async () => {
      if (onLoad !== -1) {
        try {
          await buscar();
          filtrar();
        } catch (error) {
          console.error('Erro ao buscar e filtrar dados:', error);
        }
      }
    };

    fetchData();
  }, [onLoad]);
 */

  useEffect(() => {
    filtrarObjCliente();
  }, [onLoad]);




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update = new UpdateCliente();
    update.update(cliente);

    console.log('Cliente atualizado:', cliente);
    onRefresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, propriedade: string) => {
    setCliente((prevCliente) => ({
      ...prevCliente,
      [propriedade]: e.target.value,
    }));
  };


  const filtrarObjCliente = () => {
    const clienteFiltrado = objetoCliente.find((cliente) => cliente.id === id);
    if (clienteFiltrado) { setCliente(clienteFiltrado) }
  }


  if (loading && clientes.length > 0)
    return <CircularProgress />
  else
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ padding: '20px' }}>
            <TextField label="Nome" value={cliente.nome} onChange={(e) => handleChange(e, 'nome')} variant="outlined" fullWidth />
            <TextField label="Sobrenome" value={cliente.sobreNome} onChange={(e) => handleChange(e, 'sobreNome')} variant="outlined" fullWidth />
            <TextField label="Email" value={cliente.email} onChange={(e) => handleChange(e, 'email')} variant="outlined" fullWidth />

            <TextField label="Estado" value={cliente.endereco.estado} onChange={(e) => handleChange(e, 'endereco.estado')} variant="outlined" fullWidth />
            <TextField label="Cidade" value={cliente.endereco.cidade} onChange={(e) => handleChange(e, 'endereco.cidade')} variant="outlined" fullWidth />
            <TextField label="Bairro" value={cliente.endereco.bairro} onChange={(e) => handleChange(e, 'endereco.bairro')} variant="outlined" fullWidth />
            <TextField label="Rua" value={cliente.endereco.rua} onChange={(e) => handleChange(e, 'endereco.rua')} variant="outlined" fullWidth />
            <TextField label="Número" value={cliente.endereco.numero} onChange={(e) => handleChange(e, 'endereco.numero')} variant="outlined" fullWidth />
            <TextField label="Código Postal" value={cliente.endereco.codigoPostal} onChange={(e) => handleChange(e, 'endereco.codigoPostal')} variant="outlined" fullWidth />
            <TextField label="Informações Adicionais" value={cliente.endereco.informacoesAdicionais} onChange={(e) => handleChange(e, 'endereco.informacoesAdicionais')} variant="outlined" fullWidth />

            {cliente.telefones.map((telefone, index) => (
              <div key={index}>
                <TextField
                  label={`Telefone ${index + 1} DDD`}
                  value={telefone.ddd}
                  onChange={(e) => handleChange(e, `telefones.${index}.ddd`)}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label={`Telefone ${index + 1} Número`}
                  value={telefone.numero}
                  onChange={(e) => handleChange(e, `telefones.${index}.numero`)}
                  variant="outlined"
                  fullWidth
                />
              </div>
            ))}

            <Stack direction="row" justifyContent="space-between">
              <Button type="submit" variant="contained" color="primary">
                Atualizar Cliente
                <Send sx={{ marginLeft: '10px' }} />
              </Button>
              {/*           <Link to="/">
                <Button variant="contained" color="primary">
                  Voltar
                  <ArrowBack sx={{ marginLeft: '10px' }} />
                </Button>
              </Link> */}
            </Stack>
          </Stack>
        </form>
      </div>
    );
};

export default FormularioEdicaoCliente;
