import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TopConsumersTableProps {
  consumers: string[];
}

const TopConsumersTable: React.FC<TopConsumersTableProps> = ({ consumers }) => {
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

export default function TopConsumersComponent() {
  const topConsumers: string[] = [
    'Galadriel',
    'Frodo',
    'Aragorn',
    'Legolas',
    'Gandalf',
    'Bilbo',
    'Elrond',
    'Samwise',
    'Gimli',
    'Boromir',
  ];

  return <TopConsumersTable consumers={topConsumers} />;
}
