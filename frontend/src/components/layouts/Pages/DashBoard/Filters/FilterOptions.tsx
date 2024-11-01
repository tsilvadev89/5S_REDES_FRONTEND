import { Divider, Typography } from '@mui/material';
import * as React from 'react';
import TableCliente from './TableCliente';
import TopConsumersProducts from './TableProdutos';
import TopServicesComponent from './TableServicos';


export default function FilterOptions({ selectedFilter }) {
  const [selectedGender, setSelectedGender] = React.useState('');
  const [selectedValueOrder, setSelectedValueOrder] = React.useState('');
  const [selectedQuantityOrder, setSelectedQuantityOrder] = React.useState('');
  const [itemsToDisplay, setItemsToDisplay] = React.useState(10);

  // Funções para lidar com a seleção dos filtros

  return (
    <div>
      {selectedFilter === 'Cliente' && (
        <>
            <Typography>Cliente</Typography>
            <Divider/>
            <TableCliente/>
        </>
      )}
      {selectedFilter === 'Produtos' && (
        <>
            <Typography>Produtos</Typography>
            <Divider/>
            <TopConsumersProducts/>
        </>
      )}
      {selectedFilter === 'Serviços' && (
        <>
            <Typography>Serviços</Typography>
            <Divider/>
            <TopServicesComponent/>
        </>
      )}

    </div>
  );
}
