import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableServicesProps {
  services: string[];
}

const TableServices: React.FC<TableServicesProps> = ({ services }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Top Services</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service: string, index: number) => (
            <TableRow key={index}>
              <TableCell>{service}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function TopServicesComponent() {
  const topServices: string[] = [
    'Haircut and Styling',
    'Massage Therapy',
    'Manicure and Pedicure',
    'Facial Treatment',
    'Spa Day',
    'Yoga Classes',
    'Personal Training Sessions',
    'Nutrition Counseling',
    'Acupuncture Session',
    'Meditation Workshops',
  ];

  return <TableServices services={topServices} />;
}
