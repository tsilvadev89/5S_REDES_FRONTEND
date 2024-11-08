import { Button, Stack, Typography } from '@mui/material';
import NameInput from '../ComponentesComuns/Nomes';
import DateInput from '../ComponentesComuns/Date';
import MoneyInput from '../ComponentesComuns/MoneyInput';

const CadastroServicos = () => {

  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  return (

    <Stack spacing={2}
      margin={1}>
      <Typography variant='h5' align='center' color={'GrayText'}>Cadastrar Serviços</Typography>
      <form onSubmit={handleSubmit}>

        <Stack gap={1} margin={1}>
          <DateInput />
          <NameInput />
          <MoneyInput/>
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Stack >

  );
};

export default CadastroServicos;
