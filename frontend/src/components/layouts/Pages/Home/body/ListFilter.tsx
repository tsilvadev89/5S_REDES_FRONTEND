import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import ServicesList from './Filters/ServicesList';
import { categoriaService } from '../../../../../services/categoriaService';
import { Categoria } from '../../../../../models/Categoria';

const FilterComponent = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoriaService.getAllCategorias();
        //console.log("Categorias recebidas:", fetchedCategories); // Verificação
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoriaId = event.target.value ? Number(event.target.value) : null;
    //console.log("Categoria selecionada ID:", categoriaId); // Verificação
    setSelectedCategoryId(categoriaId);
  };

  return (
    <Box sx={{ minWidth: 300, margin: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Categorias</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategoryId !== null ? selectedCategoryId.toString() : ''}
          label="Categoria"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>Nenhuma</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoria_id} value={category.categoria_id.toString()}>
              {category.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategoryId && (
        <Box mt={2}>
          <ServicesList categoriaId={selectedCategoryId} />
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
