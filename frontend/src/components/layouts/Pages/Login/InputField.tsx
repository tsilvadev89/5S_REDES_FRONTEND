// InputField.tsx
import TextField from '@mui/material/TextField';
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
