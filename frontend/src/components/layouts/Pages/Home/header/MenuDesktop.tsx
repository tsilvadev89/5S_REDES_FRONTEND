import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Menu } from '@mui/icons-material';
import CustomList from './ListItensMenu';
import { CssBaseline, AppBar, Toolbar, Typography, Divider } from '@mui/material';

type Anchor = 'left';

interface Page {
    url: string;
    name: string;
}
const drawerWidth = 200;

const pages: Page[] = [
    { url: '/', name: 'Home' },
    { url: '/cadastropessoas', name: 'Cadastro de Pessoas' },
    { url: '/cadastroempresa', name: 'Cadastro de Empresa' },
    { url: '/cadastroservicos', name: 'Cadastro de Serviços' },
    { url: '/cadastroproduto', name: 'Cadastro de Produto' },
    { url: '/dashboard', name: 'Dashboard' },
];

export default function MenuDesktop() {
    const navigate = useNavigate();

    const navigateToPage = (url: string) => {
        const page = pages.find((p) => p.url === url);

        if (page) {
            navigate(page.url);
        } else {
            navigate('/404');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <CustomList navigateToPage={navigateToPage} />
            </Drawer>
        </Box>
    );
}
