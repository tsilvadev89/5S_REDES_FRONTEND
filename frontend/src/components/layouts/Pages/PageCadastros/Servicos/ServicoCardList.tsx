import React from 'react';
import { Servico } from '../../../../../models/Servico';
import { Categoria } from '../../../../../models/Categoria';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';



interface ServicoCardListProps {
  servicos: Servico[];
  categorias: Categoria[];
  onEdit: (servico: Servico) => void;
}

const ServicoCardList: React.FC<ServicoCardListProps> = ({ servicos, categorias, onEdit }) => {
  
  // Função para obter o nome da categoria pelo ID
  const getCategoriaNome = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.categoria_id === categoriaId);
    return categoria ? categoria.nome : 'N/A';
  };

  return (
    <Stack spacing={2}>
      {servicos.map((servico) => (
        <Card key={servico.servico_id} variant="outlined">
          <Box onClick={() => onEdit(servico)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={servico.imagem_url} alt={servico.nome} />
                <div>
                  <Typography variant="h6">{servico.nome}</Typography>
                  <Typography color="textSecondary">
                    Preço: R$ {servico.preco.toFixed(2)}
                  </Typography>
                  <Typography color="textSecondary">
                    Duração: {servico.duracao}
                  </Typography>
                  <Typography color="textSecondary">
                    Categoria: {getCategoriaNome(servico.categoria_id)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export default ServicoCardList;
