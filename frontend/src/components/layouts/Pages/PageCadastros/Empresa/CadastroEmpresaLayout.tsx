import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTemplate } from '../../../../../theme/Template';
import { useEffect } from 'react';
import CadastroEmpresaPage from './CadastroEmpresaPage';

export default function CadastroEmpresaLayout() {
    const theme = useTheme();
    const { template: currentTemplate, setTemplate } = useTemplate();

    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const tablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const desktop = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        if (mobile) {
            setTemplate('mobile');
        } else if (tablet) {
            setTemplate('tablet');
        } else {
            setTemplate('desktop');
        }
    }, [mobile, tablet, desktop, setTemplate]);

    useEffect(() => {
        setTemplate(currentTemplate);
        console.log(currentTemplate);
    }, [currentTemplate, setTemplate]);

    return (
        <CadastroEmpresaPage template={currentTemplate}>
            
        </CadastroEmpresaPage>
    );
}
