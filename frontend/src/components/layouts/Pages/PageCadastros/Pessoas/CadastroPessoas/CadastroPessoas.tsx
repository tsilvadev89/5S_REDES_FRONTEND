import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import NameInput from '../../ComponentesComuns/Nomes';
import CPFInput from '../../ComponentesComuns/Cpf';
import Rg from '../../ComponentesComuns/Rg';
import DateInput from '../../ComponentesComuns/Date';
import MultiplePhonesInput from '../../ComponentesComuns/Telefone/TelefoneList';
import GenderInput from '../../ComponentesComuns/Gender';
import ClientCRUDComponent from '../PessoasBotoes';

const PersonForm = () => {
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
      <Typography variant='h5' align='center' color={'GrayText'}>Cadastrar Usuário</Typography>
      <form onSubmit={handleSubmit}>

        <Stack gap={1} margin={1}>
          <ClientCRUDComponent/>
          <DateInput />
          <NameInput />
          <TextField
            label="Nome Social"
            name="socialName"
            value={formData.socialName}
            onChange={handleChange}
            fullWidth
          />
          <GenderInput/>
          <CPFInput />
          <Rg />

          <MultiplePhonesInput />
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Stack >

  );
};

export default PersonForm;
