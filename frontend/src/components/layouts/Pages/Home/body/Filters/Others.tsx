import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import item1 from '../../../../../../assets/img/Outros/depilacaoLaser.jpg';
import item2 from '../../../../../../assets/img/Outros/limpezaPele.jpg';
import item3 from '../../../../../../assets/img/Outros/spaPes.jpg';

const OthersList = () => {
  const items = [
    {
      title: 'Depilação a Laser',
      image: item1,
    },
    {
      title: 'Limpeza de Pele',
      image: item2,
    },
    {
      title: 'Spa para os Pés',
      image: item3,
    },
  ];

  const handleItemClick = () => {

  };

  return (
    <Stack margin={2}>
      <Typography variant="h6" align="center" fontSize={24}>
        Outros
      </Typography>
      <Grid container spacing={3} padding={1}>
        {items.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                cursor: 'pointer',
              }}
              onClick={() => handleItemClick()}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle2" align="center">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default OthersList;
