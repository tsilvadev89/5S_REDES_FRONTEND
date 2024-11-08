// DateField.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DateFieldProps {
  label: string;
  value: Dayjs | null;
  onChange: (date: Date | null) => void;
  inputFormat?: string;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange, inputFormat = 'dd/MM/yyyy' }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} fullWidth required />}
      inputFormat={inputFormat}
    />
  );
};

export default DateField;
