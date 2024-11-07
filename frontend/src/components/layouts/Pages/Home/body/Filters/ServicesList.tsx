import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import { Servico } from '../../../../../../models/Servico';
import { servicoService } from '../../../../../../services/servicoService';

interface ServicesListProps {
  categoriaId: number;
}

const ServicesList: React.FC<ServicesListProps> = ({ categoriaId }) => {
  const [services, setServices] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        // Busque todos os serviços sem filtro
        const allServices = await servicoService.getAllServicos();
        // Filtre os serviços pela categoriaId passada como prop
        const filteredServices = allServices.filter(service => service.categoria_id === categoriaId);
        setServices(filteredServices);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar serviços:', err);
        setError('Não foi possível carregar os serviços.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [categoriaId]);

  return (
    <Stack margin={2}>
      <Typography variant="h6" align="center" fontSize={24}>
        Serviços
      </Typography>

      {isLoading ? (
        <Typography align="center">Carregando serviços...</Typography>
      ) : error ? (
        <Typography align="center" color="error">
          {error}
        </Typography>
      ) : services.length === 0 ? (
        <Typography align="center">Nenhum serviço disponível nesta categoria.</Typography>
      ) : (
        <Grid container spacing={3} padding={1}>
          {services.map((service) => (
            <Grid key={service.servico_id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 1,
                  boxShadow: 2,
                  cursor: 'pointer',
                }}
                onClick={() => console.log(`Serviço selecionado: ${service.nome}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.imagem_url || 'default_image_path.jpg'}
                  alt={service.nome}
                />
                <CardContent>
                  <Typography variant="subtitle2" align="center">
                    {service.nome}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default ServicesList;
