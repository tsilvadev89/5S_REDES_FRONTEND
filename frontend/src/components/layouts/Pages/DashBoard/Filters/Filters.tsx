import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterOptions from './FilterOptions'; // Componente que conterá os filtros
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { BorderColor, Clear } from '@mui/icons-material';

interface LayoutProps {
    template: string;
}

const FilterMenu: React.FC<LayoutProps> = ({ template }) => {

    const [selectedFilter, setSelectedFilter] = React.useState(null);

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <Stack direction={'column'} gap={2}>
            <Stack direction={template === 'mobile' ? 'column' : 'row'} spacing={2}>
                <Button    
                    sx={{color:'Red', border:'none'} } 
                    variant="outlined"
                    startIcon={<Clear />}
                    onClick={() => handleFilterSelect('')}
                >
                </Button>
                <Button
                    variant="contained"
                    startIcon={<PersonIcon />}
                    onClick={() => handleFilterSelect('Cliente')}
                >
                    Cliente
                </Button>
                <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleFilterSelect('Produtos')}
                >
                    Produtos
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RoomServiceIcon />}
                    onClick={() => handleFilterSelect('Serviços')}
                >
                    Serviços
                </Button>
            </Stack>

            <Stack>
                {selectedFilter && <FilterOptions selectedFilter={selectedFilter} />}
            </Stack>
        </Stack>


    );
}
export default FilterMenu;