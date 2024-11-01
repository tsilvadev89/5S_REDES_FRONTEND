import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import product1 from '../../../../../../assets/img/Produtos/product1.jpg'
import product2 from '../../../../../../assets/img/Produtos/product2.jpg';
import product3 from '../../../../../../assets/img/Produtos/product3.jpg';

const ProductsList = () => {
  const products = [
    {
      title: 'Produto 1',
      image: product1,
      // route: '/produto-1',
    },
    {
      title: 'Produto 2',
      image: product2,
      // route: '/produto-2',
    },
    {
      title: 'Produto 3',
      image: product3,
      // route: '/produto-3',
    },

  ];

  const handleProductClick = () => {

  };

  return (
    <Stack margin={2}>
      <Typography variant="h6" align="center" fontSize={24}>
        Produtos
      </Typography>
      <Grid container spacing={3} padding={1}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                cursor: 'pointer',
              }}
              onClick={() => handleProductClick()}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="subtitle2" align="center">
                  {product.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductsList;
