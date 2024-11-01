import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import hair from '../../../../../assets/img/hair.jpg'
import make from '../../../../../assets/img/make.jpg'
import spa from '../../../../../assets/img/spa.jpg'
import unhas from '../../../../../assets/img/unhas.jpg'

interface PropsCarousel {
  template: string;
}

const CarouselCard: React.FC<PropsCarousel> = ({ template }) => {
  const images = [
    hair,
    make,
    spa,
    unhas,
  ];
  const service = [
    'Cabelos',
    'Maquiagem',
    'Spa',
    'Unhas',
  ];

  const description = [
    'Descubra a Beleza que Transforma: Cabelos Radiantes e Cheios de Estilo! ✨✂️',
    'Realce Sua Beleza: Descubra Cores e Estilos para Arrasar com a Maquiagem Perfeita! 💄✨',
    'Relaxe, Renove e Revitalize: Mime-se com a Experiência Luxuosa do Nosso Spa! 🌿🛁✨',
    'Exiba Elegância: Descubra as Tendências que Farão Suas Unhas Brilharem! 💅✨',
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? images.length - 1 : prevActiveStep - 1
    );
  };
  const handleImageClick = () => {
    handleNext();
  };

  
  return (
    <Card 
      sx={
      template === 'mobile'
        ? { margin: '0 auto', maxWidth: 300 }
        : template === 'tablet'
        ? { margin: '0 auto', maxWidth: 350 }
        : { margin: '0 auto', maxWidth: 800 }
    }>
      <CardMedia
        component="img"
        /* height="200" */
        height={template === 'mobile' ? 200: 400}
        width="auto"
        image={images[activeStep]}
        alt={`Image ${activeStep + 1}`}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {service[activeStep]}
        </Typography>
        <Typography variant='subtitle2'>
          {description[activeStep]}
        </Typography>
      </CardContent>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton onClick={handleNext}>
        <ArrowForwardIcon />
      </IconButton>
    </Card>
  );
};

export default CarouselCard;
