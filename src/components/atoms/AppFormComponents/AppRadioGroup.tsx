import React from "react";
import { FieldHookConfig, useField } from "formik";
import TextField from "@mui/material/TextField";
import { RadioGroupProps } from "@mui/material/RadioGroup/RadioGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface AppRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}

const AppRadioGroup = ({
  name,
  options,
  defaultValue,
}: AppRadioGroupProps) => {
  const [field, meta] = useField(name);

  console.log(field);
  return (
    <RadioGroup
      row
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default AppRadioGroup;
