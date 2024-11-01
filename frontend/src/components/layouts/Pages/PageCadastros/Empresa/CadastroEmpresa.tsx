import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import NameInput from '../ComponentesComuns/Nomes';
import DateInput from '../ComponentesComuns/Date';
import MultiplePhonesInput from '../ComponentesComuns/Telefone/TelefoneList';
import CNPJInput from '../ComponentesComuns/Cnpj';

interface LayoutProps {
  template: string;
}

const CadastroEmpresa: React.FC<LayoutProps> = ({ template }) => {
  
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
      <form onSubmit={handleSubmit}>
        <Typography variant='h5' align='center' color={'GrayText'}>Cadastrar Empresa</Typography>
        <Stack gap={1} margin={1}>
          <DateInput />
          <NameInput />
          <TextField
            label="Nome Social"
            name="socialName"
            value={formData.socialName}
            onChange={handleChange}
            fullWidth
          />
          <CNPJInput/>
          
          <MultiplePhonesInput />
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Stack >

  );
};

export default CadastroEmpresa;
