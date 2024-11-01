import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import ServicesList  from './Filters/ServicesList'
import ProductsList from './Filters/Products';
import OthersList from './Filters/Others';

const FilterComponent = () => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  let selectedComponent;
  if (category === 'services') {
    selectedComponent = <ServicesList />;
  } else if (category === 'products') {
    selectedComponent = <ProductsList />;
  } else if (category === 'others') {
    selectedComponent = <OthersList />;
  }

  return (
    <Box sx={{ minWidth: 300 , margin: 2}}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Categorias</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'services'}>Serviços</MenuItem>
          <MenuItem value={'products'}>Produtos</MenuItem>
          <MenuItem value={'others'}>Outros</MenuItem>
        </Select>
      </FormControl>
      {selectedComponent && (
        <Box mt={2}>
          {selectedComponent}
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
