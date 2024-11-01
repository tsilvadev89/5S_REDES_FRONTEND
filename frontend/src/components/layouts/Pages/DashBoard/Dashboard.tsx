import FilterMenu from './Filters/Filters';
import { Stack } from '@mui/material';

interface LayoutProps {
  template: string;
}

const Dashboard: React.FC<LayoutProps> = ({ template }) => {
  const analyzeTopConsumers = () => {
    return "Top 10 clientes que mais consumiram produtos ou serviços (em quantidade)";
  };

  const analyzeAllCustomersByGender = () => {
    return "Lista de clientes por gênero";
  };

  return (
    <Stack direction={template === 'mobile' ? 'column' : 'row'}>
      
      <FilterMenu template={template}/>
    </Stack>
  );
}

export default Dashboard;
