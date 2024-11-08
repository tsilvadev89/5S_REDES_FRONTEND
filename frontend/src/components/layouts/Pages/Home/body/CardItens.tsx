import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Categoria } from '../../../../../models/Categoria';
import { categoriaService } from '../../../../../services/categoriaService';

interface PropsCarousel {
  template: string;
}

const CarouselCard: React.FC<PropsCarousel> = ({ template }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategorias = await categoriaService.getAllCategorias();
        setCategorias(fetchedCategorias);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Configura o intervalo para avançar automaticamente
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === categorias.length - 1 ? 0 : prevActiveStep + 1
      );
    }, 5000); // Timing Carrocel

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [categorias.length]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === categorias.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? categorias.length - 1 : prevActiveStep - 1
    );
  };

  const handleImageClick = () => {
    handleNext();
  };

  if (categorias.length === 0) return null; // Aguarda carregamento dos dados

  const currentCategoria = categorias[activeStep];

  return (
    <Card
      sx={
        template === 'mobile'
          ? { margin: '0 auto', maxWidth: 300 }
          : template === 'tablet'
          ? { margin: '0 auto', maxWidth: 350 }
          : { margin: '0 auto', maxWidth: 800 }
      }
    >
      <CardMedia
        component="img"
        height={template === 'mobile' ? 200 : 400}
        width="auto"
        image={currentCategoria.imagem_url || 'default_image_path.jpg'} 
        alt={currentCategoria.nome}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {currentCategoria.nome}
        </Typography>
        <Typography variant="subtitle2">
          {currentCategoria.descricao}
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
