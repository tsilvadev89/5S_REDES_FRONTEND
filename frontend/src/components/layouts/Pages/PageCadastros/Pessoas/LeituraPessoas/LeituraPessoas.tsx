import { useState, useEffect } from 'react';
import { Typography, Stack, CircularProgress, IconButton, Tooltip, Card, CardActions, CardContent, Button } from '@mui/material';
import ClientCRUDComponent from '../PessoasBotoes';
import { Cliente } from '../tipagemClientes';
import { Edit, Delete, Add } from '@mui/icons-material';
import FormularioCadastroCliente from '../../../../../api/componentes/CadastroCliente';
import RemovedorCliente from '../../../../../api/removedores/removedorCliente';
import FormularioEdicaoCliente from '../../../../../api/componentes/UpdateCliente';
import ArrowBack from '@mui/icons-material/ArrowBack';

const LeituraPessoas = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formEdicao, setFormEdicao] = useState(-1);

  async function buscar() {
    try {
      const resposta = await fetch('http://localhost:32832/clientes');
      const json: Cliente[] = await resposta.json();
      setClientes(json);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      /* alert('Erro ao buscar dados: verifique se o banco de dados está inicializado'); */
    } finally {
      setLoading(false);

    }
  }


  useEffect(() => {
    buscar();
  }, []);

  const handleEditar = (id: number) => {
    setFormEdicao((prevId) => (prevId === id ? -1 : id));
  };

  const handleRefresh = () => {
    handleEditar(-1);
    window.location.reload(); 
  };


  const excluir = async (id: number) => {
    try {
      await RemovedorCliente.remover({ id });
      buscar();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      /* alert('Erro ao exluir cliente, verifique se o banco de dados está inicializado'); */
      window.location.reload();
    }
  };


  if (loading) return <CircularProgress />
  else return (
    <Stack>
      {/* <ClientCRUDComponent /> */}
      <Stack alignItems={'center'}>
        <Button
          onClick={() => setMostrarFormulario((prev) => !prev)}
          variant={'contained'}
          sx={{ margin: '1rem', padding: '1rem', width: '18rem' }}
        >
          <Add sx={{ marginRight: '10px' }} /> Novo Usuário
        </Button>
      </Stack>
      {mostrarFormulario ? <FormularioCadastroCliente onRefresh={handleRefresh} /> : <></>}



      <Stack direction="row" spacing={2} justifyContent="center" flexWrap={'wrap'} gap={2}>

        {clientes.map((cliente: Cliente) => (
          <Card key={cliente.id} sx={{ maxWidth: 300, marginBottom: 20 }}>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom>ID: {cliente.id}</Typography>
              <Typography variant='body2'><b>Nome:</b> {cliente.nome}</Typography>
              <Typography variant='body2'><b>Sobrenome:</b> {cliente.sobreNome}</Typography>
              <Typography variant='body2'><b>Email:</b> {cliente.email || 'N/A'}</Typography>
              <Typography variant='body2'>
                <b>Endereço:</b><br />
                {cliente.endereco.rua}, {cliente.endereco.numero}<br />
                {cliente.endereco.bairro}<br />
                {cliente.endereco.cidade}, {cliente.endereco.estado}<br />
                CEP: {cliente.endereco.codigoPostal}
              </Typography>
              <Typography variant='body2'><b>Informações Adicionais:</b> {cliente.endereco.informacoesAdicionais}</Typography>
              <Typography variant='body2'><b>Telefones:</b> {cliente.telefones.map((telefone) => `${telefone.ddd} ${telefone.numero}`).join(', ')}</Typography>
            </CardContent>
            <CardActions>
              {formEdicao !== cliente.id ? (
                <>
                  <Tooltip title="Editar" placement="top">
                    <IconButton onClick={() => handleEditar(cliente.id)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir" placement="top">
                    <IconButton onClick={() => excluir(cliente.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Voltar" placement="top">
                  <IconButton onClick={() => handleEditar(null)}>
                    <ArrowBack style={{ color: '#ff0000' }}/>
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
            {/* {formEdicao ? <FormularioEdicaoCliente id={cliente.id}/> : <></>} */}
            <Stack sx={{ id: `formedit${cliente.id}` }} display={formEdicao === cliente.id ? 'block' : 'none'}>
              <Typography align='center'> Editar Cliente {cliente.id}</Typography>
              <FormularioEdicaoCliente id={cliente.id} onRefresh={handleRefresh} onLoad={formEdicao} objetoCliente={clientes}/>
            </Stack>
          </Card>

        ))}
      </Stack>

    </Stack>
  );
};

export default LeituraPessoas;
