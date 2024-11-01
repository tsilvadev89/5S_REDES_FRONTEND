import React, { useState } from 'react';
import { Typography, Stack, TextField, Button } from '@mui/material';

type CampoFormulario = keyof typeof valoresFormulario;

const NovoClienteFormulario = () => {
    const [valoresFormulario, setValoresFormulario] = useState({
        nome: '',
        sobreNome: '',
        email: null,
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: '',
        },
        telefones: [] as { [key: string]: string }[], // Defina o tipo correto aqui
    });
    
    const handleCampoChange = (campo: CampoFormulario, valor: string) => {
        setValoresFormulario((prevState) => ({
            ...prevState,
            [campo]: valor,
        }));
    };

    const handleEnderecoChange = (campo: keyof typeof valoresFormulario.endereco, valor: string) => {
        setValoresFormulario((prevState) => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [campo]: valor,
            },
        }));
    };

    const handleTelefoneChange = (campo: keyof typeof valoresFormulario.telefones[0], valor: string) => {
        setValoresFormulario((prevState) => {
            const telefonesAtualizados = prevState.telefones?.map((telefone, index) => {
                if (index === 0) {
                    return {
                        ...telefone,
                        [campo]: valor,
                    };
                }
                return telefone;
            }) || [];
    
            return {
                ...prevState,
                telefones: telefonesAtualizados,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Valores do formulário:', valoresFormulario);
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h5' align='center' color={'GrayText'}>Novo Usuário</Typography>
            <Stack spacing={2} sx={{ padding: '20px' }}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={valoresFormulario.nome}
                    onChange={(e) => handleCampoChange('nome', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Sobrenome"
                    name="sobreNome"
                    value={valoresFormulario.sobreNome}
                    onChange={(e) => handleCampoChange('sobreNome', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={valoresFormulario.email || ''}
                    onChange={(e) => handleCampoChange('email', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                {/* Campos de Endereço */}
                <TextField
                    label="Estado"
                    name="estado"
                    value={valoresFormulario.endereco?.estado || ''}
                    onChange={(e) => handleEnderecoChange('estado', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Cidade"
                    name="cidade"
                    value={valoresFormulario.endereco?.cidade || ''}
                    onChange={(e) => handleEnderecoChange('cidade', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Bairro"
                    name="bairro"
                    value={valoresFormulario.endereco?.bairro || ''}
                    onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Rua"
                    name="rua"
                    value={valoresFormulario.endereco?.rua || ''}
                    onChange={(e) => handleEnderecoChange('rua', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Número"
                    name="numero"
                    value={valoresFormulario.endereco?.numero || ''}
                    onChange={(e) => handleEnderecoChange('numero', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Código Postal"
                    name="codigoPostal"
                    value={valoresFormulario.endereco?.codigoPostal || ''}
                    onChange={(e) => handleEnderecoChange('codigoPostal', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Informações Adicionais"
                    name="informacoesAdicionais"
                    value={valoresFormulario.endereco?.informacoesAdicionais || ''}
                    onChange={(e) => handleEnderecoChange('informacoesAdicionais', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                {/* Campos de Telefone */}
                <TextField
                    label="Telefone DDD"
                    name="telefoneDDD"
                    value={valoresFormulario.telefones?.[0]?.ddd || ''}
                    onChange={(e) => handleTelefoneChange('ddd', e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                {/* Adicione mais campos de telefone conforme necessário */}
                <Button type="submit" variant="contained" color="primary">
                    Criar Usuário
                </Button>
            </Stack>
        </form>
    );
};

export default NovoClienteFormulario;
