import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Hidden } from "@mui/material";

interface CheckedActionsProps {
  checkedItems: number[];
  setCheckedItems: (checkedItems: number[]) => void;
  onSelectItemsForDelete: (checkedItems: number[]) => void;
}

const CheckedActions = ({
  checkedItems,
  setCheckedItems,
  onSelectItemsForDelete,
}: CheckedActionsProps) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        mr: { xs: 2, xl: 3 },
      }}
    ></Box>
  );
};

export default CheckedActions;
