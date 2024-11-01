import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import NameInput from '../ComponentesComuns/Nomes';
import DateInput from '../ComponentesComuns/Date';
import MoneyInput from '../ComponentesComuns/MoneyInput';
import QuantityCounter from '../ComponentesComuns/QuantityCounter';

const CadastroServicos = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialName: '',
    cpf: '',
    rg: '',
    registrationDate: '',
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
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
