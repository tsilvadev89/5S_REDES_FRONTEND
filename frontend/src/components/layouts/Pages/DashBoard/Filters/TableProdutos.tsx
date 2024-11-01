import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableProdutosProps {
  consumers: string[];
}

const TableProdutos: React.FC<TableProdutosProps> = ({ consumers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Top Consumers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consumers.map((consumer: string, index: number) => (
            <TableRow key={index}>
              <TableCell>{consumer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function TopConsumersProducts() {
  const topConsumers: string[] = [
    'MAC Ruby Woo Lipstick',
    'LOreal Paris Voluminous Mascara',
    'Urban Decay Naked Palette',
    'Maybelline Fit Me Foundation',
    'Anastasia Beverly Hills Brow Wiz',
    'NARS Radiant Creamy Concealer',
    'Fenty Beauty Gloss Bomb',
    'Olaplex Hair Perfector',
    'The Ordinary Hyaluronic Acid',
    'Mario Badescu Facial Spray',
  ];

  return <TableProdutos consumers={topConsumers} />;
}
