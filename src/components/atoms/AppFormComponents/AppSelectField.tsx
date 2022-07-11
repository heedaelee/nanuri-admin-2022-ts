import React, { useState } from "react";
import { FieldHookConfig, useField } from "formik";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { SelectProps } from "@mui/material/Select/Select";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
} from "@mui/material";

interface AppSelectFieldProps {
  menus: string[] | any[];
  label?: string;
  selectionKey?: string[];
  defaultValue: any;
  FormControlProps?: FormControlProps;
}

const AppSelectField = ({
  menus = [],
  defaultValue,
  label,
  selectionKey = [],
  FormControlProps,
  ...props
}: SelectProps & FieldHookConfig<string> & AppSelectFieldProps) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";
  const [selectionType, setSelectionType] = useState(defaultValue);

  // const handleSelectionType = (
  //   event: SelectChangeEvent<{ value: unknown }>
  // ) => {
  //   console.log("====================================");
  //   console.log(event.target.value);
  //   console.log("====================================");
  //   setSelectionType(event.target.value);
  // };

  const menuProps = menus.map((menu: any, index: number) => (
    <MenuItem
      key={index}
      value={
        selectionKey.length > 0 ? menu[selectionKey[index]] : menu
      }
    >
      {selectionKey.length > 0 ? selectionKey[index] : menu}
    </MenuItem>
  ));

  return (
    <FormControl {...FormControlProps}>
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <Select
        {...props}
        {...field}
        labelId={"select-label"}
        // value={selectionType}
        // onChange={handleSelectionType}
        error={!!errorText}
      >
        {menuProps}
      </Select>
      {!props.disabled && (
        <FormHelperText
          style={{ color: "#f44336", textAlign: "right" }}
        >
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppSelectField;
