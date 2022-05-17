import React, { useState } from "react";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
import { CremaTheme } from "../../../@types/AppContextPropsType";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

const useStyles = makeStyles((theme: CremaTheme) => ({
  selectBox: {
    marginLeft: 8,
    cursor: "pointer",
    fontSize: 14,
    [theme.breakpoints.up("xl")]: {
      marginLeft: 24,
    },
    "& .MuiSelect-select": {
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  menuItem: {
    paddingTop: 0,
    border: "1px solid black",
    "& .MuiMenuItem-root": {
      paddingTop: 0,
      border: "1px solid black",
    },
  },
}));

interface AppSelectProps {
  menus: string[] | any[];
  onChange: (value: any) => void;
  defaultValue: any;
  selectionKey?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  menus = [],
  onChange,
  defaultValue = "",
  selectionKey = "",
}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    setSelectionType(event.target.value);
    onChange(event.target.value);
  };
  const classes = useStyles();
  return (
    <Select
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      className={clsx(classes.selectBox, "select-box")}
    >
      {menus.map((menu: any, index: number) => (
        <MenuItem
          key={index}
          value={selectionKey ? menu[selectionKey] : menu}
          // className={clsx(classes.menuItem)}
        >
          {selectionKey ? menu[selectionKey] : menu}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AppSelect;
