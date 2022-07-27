import React from "react";
import { FieldHookConfig, useField } from "formik";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { FormControl, FormHelperText } from "@mui/material";

interface AppTextFieldProps {
  align?: "left" | "right" | "center";
}

const AppTextField = (
  props: TextFieldProps & FieldHookConfig<any> & AppTextFieldProps
) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  const align = props.align ? props.align : "left";
  return (
    <TextField
      {...props}
      {...field}
      FormHelperTextProps={{ sx: { textAlign: align } }}
      helperText={errorText ? errorText : props.helperText}
      error={!!errorText}
    />
  );
};

export default AppTextField;
