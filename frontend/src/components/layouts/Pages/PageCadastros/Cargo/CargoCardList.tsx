import React from 'react';
import { Cargo } from '../../../../../models/Cargo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


interface CargoCardListProps {
  cargos: Cargo[];
  onEdit: (cargo: Cargo) => void;
}

const CargoCardList: React.FC<CargoCardListProps> = ({ cargos, onEdit }) => {
  return (
    <Stack spacing={2}>
      {cargos.map((cargo) => (
        <Card key={cargo.cargo_id} variant="outlined">
          <Box onClick={() => onEdit(cargo)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={cargo.imagem_url} alt={cargo.nome} />
                <div>
                  <Typography variant="h6">{cargo.nome}</Typography>
                  <Typography color="textSecondary">
                    Descrição: {cargo.descricao}
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

export default CargoCardList;
