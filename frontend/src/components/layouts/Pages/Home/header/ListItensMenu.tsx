import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FactoryIcon from '@mui/icons-material/Factory';
import ConstructionIcon from '@mui/icons-material/Construction';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';

function CustomList({ navigateToPage }) {
  return (
    <>
      {/* HOME PAGE */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/')}>
            <ListItemIcon>
              <HomeIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Home" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* CADASTROS */}
      <List>
        <ListItem>
          <ListItemText primary="Cadastro" /> {/* //// TEXT */}
        </ListItem>
        {/* PESSOAS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastropessoas')}>
            <ListItemIcon>
              <PeopleIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Usuarios" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>

        {/* EMPRESAS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastroempresa')}>
            <ListItemIcon>
              <FactoryIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Empresas" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>

        {/* SERVIÇOS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastroservicos')}>
            <ListItemIcon>
              <ConstructionIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Serviços" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastroproduto')}>
            <ListItemIcon>
              <InventoryIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Produtos" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      {/* Listagem */}
      <List>
        <ListItem>
          <ListItemText primary="Relatórios" /> {/* //// TEXT */}
        </ListItem>
        {/* PESSOAS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon /> {/* // ICON */}
            </ListItemIcon>
            <ListItemText primary="Dashboard" /> {/* //// TEXT */}
          </ListItemButton>
        </ListItem>
      </List>
      
    </>
  );
}

export default CustomList;
