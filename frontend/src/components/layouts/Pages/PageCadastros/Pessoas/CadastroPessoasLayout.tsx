import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTemplate } from '../../../../../theme/Template';
import CadastroPessoasPage from './CadastroPessoasPage';

export default function CadastroPessoasLayout() {
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
        // console.log(currentTemplate);
    }, [currentTemplate, setTemplate]);

    return (
        <CadastroPessoasPage template={currentTemplate}>
            
        </CadastroPessoasPage>
    );
}
