import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


const GenderInput = () => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setGender(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sexo</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={gender}
        onChange={handleGenderChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="female" control={<Radio />} label="Feminino" />
      </RadioGroup>
    </FormControl>
  );
};

export default GenderInput;
