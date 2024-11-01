import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import corte from '../../../../../../assets/img/Servicos/corte.jpg'
import penteado from '../../../../../../assets/img/Servicos/penteado.jpg'
import pintura from '../../../../../../assets/img/Servicos/pintura.jpg'
/* import { useHistory } from 'react-router-dom'; // Importe o useHistory se estiver usando React Router */

const ServicesList = () => {
  const services = [
    {
      title: 'Corte de Cabelo',
      image: corte,
      route: '/Corte',
    },
    {
      title: 'Penteado',
      image: penteado,
      route: '/penteado',
    },
    {
      title: 'Coloração',
      image: pintura,
      route: '/pintura',
    },
    // Adicione mais serviços conforme necessário
  ];

 /*  const history = useHistory(); */

  const handleServiceClick = () =>{

  }

/*   const handleServiceClick = (route) => {

    history.push(route);

  }; */

  return (
    <Stack margin={2}>
      <Typography variant="h6" align="center" fontSize={24}>
        Serviços
      </Typography>
      <Grid container spacing={3} padding={1}>
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                cursor: 'pointer', // Adiciona o estilo do cursor para indicar que é clicável
              }}
              /* onClick={() => handleServiceClick(service.route)} // Chama a função ao clicar no card */
              onClick={() => handleServiceClick()}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography variant="subtitle2" align="center">
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ServicesList;
